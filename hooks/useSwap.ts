import { TransactionResponse } from '@ethersproject/providers';
import { NumberFormatter } from '@xfi/formatters';
import { BigNumber } from 'ethers';
import { useCallback, useMemo, useState } from 'react';

import { TokenSymbol, WXFI_CONTRACT_ADDRESS, ZERO } from '@/shared/constants';
import { TxTemplateTypes } from '@/store/transactions/types';

import useActiveWeb3React from './useActiveWeb3React';
import useGetSwapPath from './useGetSwapPath';
import type { TokenData } from './useTokensList';
import useTxTemplate from './useTxTemplate';
import useUniswapRouter from './useUniswapRouter';
import useWXfiContract from './useWXfiContract';

const getDeadline = () => Math.floor(Date.now() / 1000) + 60 * 20;

const getAmountSlippage97 = (amount: BigNumber) => {
  return amount.mul(97).div(100);
};

const useSwap = ({
  amountIn: _amountIn,
  amountOut: _amountOut,
  tokenIn,
  tokenOut,
  setPendingTx,
}: {
  // user input value
  amountIn?: string;
  // user input value
  amountOut?: string;
  tokenIn?: TokenData;
  tokenOut?: TokenData;
  setPendingTx: (txHash: string) => void;
}) => {
  const amountIn = useMemo(() => {
    if (!tokenIn || !_amountIn) return ZERO;

    return BigNumber.from(NumberFormatter.parseUnits(_amountIn, tokenIn.data.decimals));
  }, [_amountIn, tokenIn]);
  const amountOut = useMemo(() => {
    if (!tokenOut || !_amountOut) return ZERO;

    return BigNumber.from(NumberFormatter.parseUnits(_amountOut, tokenOut.data.decimals));
  }, [_amountOut, tokenOut]);

  const contract = useUniswapRouter();
  const wXfiContract = useWXfiContract();
  const wXfiAddress = WXFI_CONTRACT_ADDRESS;

  const { account = '' } = useActiveWeb3React();
  const { result: path, isLoading } = useGetSwapPath(tokenIn?.address, tokenOut?.address);

  const isXfiToWxfi = tokenIn?.address === TokenSymbol.xfi && tokenOut?.address === wXfiAddress;
  const iswXfiToXfi = tokenIn?.address === wXfiAddress && tokenOut?.address === TokenSymbol.xfi;
  const isWrappedSwap = isXfiToWxfi || iswXfiToXfi;

  const [swappedIn, setSwappedIn] = useState<BigNumber>();
  const [swappedOut, setSwappedOut] = useState<BigNumber>();

  const dataFunc = useCallback(
    async (clickedByUser: any) => {
      const deadline = getDeadline();

      if (!isWrappedSwap && !path?.Path) return;

      if (clickedByUser) {
        setSwappedIn(amountIn);
        setSwappedOut(amountOut);
      }

      if (isXfiToWxfi) {
        return {
          ...(await wXfiContract?.populateTransaction.deposit()),
          value: amountIn,
        };
      }

      if (iswXfiToXfi) {
        return await wXfiContract?.populateTransaction.withdraw(amountIn);
      }

      if (tokenIn?.address === TokenSymbol.xfi && path?.Path) {
        return {
          ...(await contract?.populateTransaction.swapExactETHForTokens(
            getAmountSlippage97(amountOut),
            path?.Path,
            account,
            deadline
          )),
          value: amountIn,
        };
      }

      if (tokenOut?.address === TokenSymbol.xfi && path?.Path) {
        return await contract?.populateTransaction.swapExactTokensForETH(
          amountIn,
          getAmountSlippage97(amountOut),
          path?.Path,
          account,
          deadline
        );
      }

      if (!path?.Path) return;

      return await contract?.populateTransaction.swapExactTokensForTokens(
        amountIn,
        getAmountSlippage97(amountOut),
        path?.Path,
        account,
        deadline
      );
    },
    [
      contract,
      amountIn,
      amountOut,
      path?.Path,
      account,
      wXfiContract,
      isWrappedSwap,
      isXfiToWxfi,
      iswXfiToXfi,
      tokenIn,
      tokenOut,
    ]
  );

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx && setPendingTx(tx.hash);
    },
    [setPendingTx]
  );

  return {
    ...useTxTemplate(
      TxTemplateTypes.Swapped,
      `$swap_${tokenIn}_${tokenOut}`,
      'NOTIFICATIONS.TRANSACTION_PERFORMED_SUCCESSFULLY',
      dataFunc,
      setTx
    ),
    path,
    loadingPath: isLoading,
    isXfiToWxfi,
    iswXfiToXfi,
    isWrappedSwap,
    swappedIn,
    swappedOut,
  };
};

export default useSwap;
