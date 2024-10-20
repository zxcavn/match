import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber, PopulatedTransaction } from 'ethers';
import { useCallback, useMemo, useState } from 'react';

import { calculateGasMargin, isActionRejectedError } from '@/helpers';
import { ZERO } from '@/shared/constants';
import { useAddPopup } from '@/store/application/hooks';
import { ITxData, useHasPendingNftAction, useTransactionAdder } from '@/store/transactions/hooks';

import useActiveWeb3React from './useActiveWeb3React';

type AsyncFunc = (data?: any) => Promise<PopulatedTransaction | undefined>;

type ErrorPayload = {
  message: string;
};

const useTxTemplate = (
  type: string,
  description: string,
  successMsg: string,
  funcTxData: AsyncFunc,
  txCallback?: (tx: TransactionResponse) => void,
  failMsg?: any,
  manualGazLimit?: BigNumber,
  txSavingParams?: {
    bridge: {
      fromChainId: number;
      toChainId: number;
    };
  }
) => {
  const { account, chainId, provider: library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  const [disabled, setDisabled] = useState(false);

  const [isError, setIsError] = useState(false);
  const [txError, setTxError] = useState<ErrorPayload | null>(null);

  const resetErrors = useCallback(() => {
    setIsError(false);
    setTxError(null);
  }, []);

  const [calledWallet, setCalledWallet] = useState(false);

  const pending = useHasPendingNftAction(description);

  const addPopup = useAddPopup();

  const estimatedGasLimit = useCallback(
    async (showError?: boolean) => {
      if (!chainId || !library || !account) return ZERO;

      if (account) {
        setIsError(false);
        const txData = await funcTxData();

        const txn = {
          ...txData,
          value: txData?.value || '0x0',
        };

        try {
          const estimatedCost = await library.getSigner().estimateGas(txn);

          return calculateGasMargin(chainId, estimatedCost);
        } catch (error) {
          console.error('Failed to estimate transaction', error);
          setIsError(true);
          if (showError) {
            addPopup({
              type: 'error',
              message: { id: 'ERRORS.ESTIMATE_GAS_ERROR' },
              additional: { id: 'ERRORS.CAN_NOT_ESTIMATE_GAS_USAGE_FOR_TX' },
            });
          }
        }
      }

      return ZERO;
    },
    [funcTxData, account, chainId, library, addPopup]
  );

  const action = useCallback(
    async (data?: any) => {
      setIsError(false);
      setTxError(null);
      if (!chainId || !library || !account) return;

      if (account) {
        const txData = await funcTxData(data);
        const txn = {
          ...txData,
          value: txData?.value || '0x0',
        };

        const estimatedCost = manualGazLimit || (await estimatedGasLimit(true));

        const gazLimit = estimatedCost ? calculateGasMargin(chainId, estimatedCost) : manualGazLimit;

        try {
          const newTxn: ITxData = {
            ...txn,
            gasLimit: gazLimit,
          };

          setCalledWallet(true);

          return await library
            .getSigner()
            .sendTransaction(newTxn)
            .then((response: TransactionResponse) => {
              // eslint-disable-next-line no-console
              console.log('response', response);
              txCallback && txCallback(response);

              addTransaction(response, {
                summary: successMsg,
                nftAction: {
                  nftAddress: '',
                  tokenId: '',
                  type: description,
                },
                type,
                txData: newTxn,
                ...txSavingParams,
              });
            });
        } catch (error) {
          if (!isActionRejectedError(error)) {
            setIsError(true);

            console.error('Failed to send transaction', error);

            setDisabled(true);

            failMsg &&
              addPopup({
                type: 'error',
                message: { id: 'ERRORS.TRANSACTION_ERROR' },
                additional: { text: failMsg },
              });

            setTxError({
              message: 'ERRORS.SOMETHING_WENT_WRONG',
            });
          } else {
            console.warn('userTxTemplate: Metamask action rejected');
          }
        } finally {
          setCalledWallet(false);
        }
      } else {
        return;
      }
    },
    [
      successMsg,
      manualGazLimit,
      description,
      type,
      funcTxData,
      account,
      addTransaction,
      chainId,
      library,
      addPopup,
      failMsg,
      estimatedGasLimit,
      txCallback,
      txSavingParams,
    ]
  );

  const txInfo = useMemo(() => ({ estimatedGasLimitFunc: estimatedGasLimit }), [estimatedGasLimit]);

  return useMemo(
    () => ({ pending, action, disabled, calledWallet, isError, txInfo, resetErrors, txError }),
    [pending, action, disabled, txInfo, isError, calledWallet, resetErrors, txError]
  );
};

export default useTxTemplate;
