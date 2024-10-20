import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { useWeb3React } from '@web3-react/core';
import ms from 'ms';
import { useCallback, useEffect, useMemo } from 'react';

import { CanceledError, retry, RetryableError, RetryOptions } from '@/helpers/retry';
import useBlockNumber, { useFastForwardBlockNumber } from '@/hocs/BlockNumberProvider';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import useCurrentBlockTimestamp from '@/hooks/useCurrentBlockTimestamp';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { SupportedChainId } from '@/shared/constants';

import { useAddPopup } from '../application/hooks';
import { isPendingTx, useTransactionRemover } from './hooks';
import { checkedTransaction, finalizeTransaction } from './reducer';
import { SerializableTransactionReceipt, TransactionDetails } from './types';

function toSerializableReceipt(receipt: TransactionReceipt): SerializableTransactionReceipt {
  return {
    blockHash: receipt.blockHash,
    blockNumber: receipt.blockNumber,
    contractAddress: receipt.contractAddress,
    from: receipt.from,
    status: receipt.status,
    to: receipt.to,
    transactionHash: receipt.transactionHash,
    transactionIndex: receipt.transactionIndex,
  };
}

export const DEFAULT_TXN_DISMISS_MS = 8000;
export const L2_TXN_DISMISS_MS = 5000;

export default function Updater() {
  const { isFormattedMessageId } = useIntlHelpers();

  const { chainId } = useWeb3React();
  const addPopup = useAddPopup();
  // speed up popup dismisall time if on L2
  const isL2 = false;
  const transactions = useAppSelector(state => state.transactions);
  const pendingTransactions = useMemo(() => {
    if (!chainId || !transactions[chainId]) return {};
    return Object.values(transactions[chainId]).reduce((acc, tx) => {
      if (isPendingTx(tx)) acc[tx.hash] = tx;
      return acc;
    }, {} as Record<string, TransactionDetails>);
  }, [chainId, transactions]);

  const dispatch = useAppDispatch();
  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }: { chainId: number; hash: string; blockNumber: number }) =>
      dispatch(checkedTransaction({ chainId, hash, blockNumber })),
    [dispatch]
  );
  const onReceipt = useCallback(
    ({ chainId, hash, receipt }: { chainId: number; hash: string; receipt: TransactionReceipt }) => {
      dispatch(
        finalizeTransaction({
          chainId,
          hash,
          receipt: toSerializableReceipt(receipt),
        })
      );

      const summary = transactions[chainId][hash]?.summary;
      const messageId = typeof summary === 'undefined' ? 'NOTIFICATIONS.TRANSACTION_PERFORMED_SUCCESSFULLY' : summary;

      addPopup(
        {
          type: 'success',
          message: isFormattedMessageId(messageId) ? { id: messageId } : { text: summary },
        },
        hash,
        isL2 ? L2_TXN_DISMISS_MS : DEFAULT_TXN_DISMISS_MS
      );
    },
    [addPopup, transactions, dispatch, isL2]
  );

  return <TxUpdater pendingTransactions={pendingTransactions} onCheck={onCheck} onReceipt={onReceipt} />;
}

interface Transaction {
  addedTime: number;
  receipt?: unknown;
  lastCheckedBlockNumber?: number;
}

export function shouldCheck(lastBlockNumber: number, tx: Transaction): boolean {
  if (tx.receipt) return false;

  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;

  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / ms(`1m`);

  if (minutesPending > 60) {
    // every 10 blocks if pending longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending longer than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}

const RETRY_OPTIONS_BY_CHAIN_ID: { [chainId: number]: RetryOptions } = {
  [SupportedChainId.ARBITRUM_ONE]: { n: 10, minWait: 250, maxWait: 1000 },
  [SupportedChainId.XFI_TESTNET]: { n: 10, minWait: 250, maxWait: 1000 },
};

const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 1, minWait: 0, maxWait: 0 };

interface UpdaterProps {
  pendingTransactions: { [hash: string]: TransactionDetails };
  onCheck: (tx: { chainId: number; hash: string; blockNumber: number }) => void;
  onReceipt: (tx: { chainId: number; hash: string; receipt: TransactionReceipt }) => void;
}

function TxUpdater({ pendingTransactions, onCheck, onReceipt }: UpdaterProps): null {
  const { account, chainId, provider } = useWeb3React();

  const lastBlockNumber = useBlockNumber();
  const fastForwardBlockNumber = useFastForwardBlockNumber();
  const removeTransaction = useTransactionRemover();
  const blockTimestamp = useCurrentBlockTimestamp();

  const getReceipt = useCallback(
    (hash: string) => {
      if (!provider || !chainId) throw new Error('No provider or chainId');
      const retryOptions = RETRY_OPTIONS_BY_CHAIN_ID[chainId] ?? DEFAULT_RETRY_OPTIONS;

      return retry(
        () =>
          provider.getTransactionReceipt(hash).then(async receipt => {
            if (receipt === null) {
              if (account) {
                const tx = pendingTransactions[hash];

                // Remove transactions past their deadline or - if there is no deadline - older than 6 hours.
                if (tx.deadline) {
                  // Deadlines are expressed as seconds since epoch, as they are used on-chain.
                  if (blockTimestamp && tx.deadline < blockTimestamp.toNumber()) {
                    removeTransaction(hash);
                  }
                } else if (tx.addedTime + ms(`6h`) < Date.now()) {
                  removeTransaction(hash);
                }
              }

              throw new RetryableError();
            }
            return receipt;
          }),
        retryOptions
      );
    },
    [account, blockTimestamp, chainId, pendingTransactions, provider, removeTransaction]
  );

  useEffect(() => {
    if (!chainId || !provider || !lastBlockNumber) return;

    const cancels = Object.keys(pendingTransactions)
      .filter(hash => shouldCheck(lastBlockNumber, pendingTransactions[hash]))
      .map(hash => {
        const { promise, cancel } = getReceipt(hash);

        promise
          .then(receipt => {
            fastForwardBlockNumber(receipt.blockNumber);
            onReceipt({ chainId, hash, receipt });
          })
          .catch(error => {
            if (error instanceof CanceledError) return;

            onCheck({ chainId, hash, blockNumber: lastBlockNumber });
          });

        return cancel;
      });

    return () => {
      cancels.forEach(cancel => cancel());
    };
  }, [chainId, provider, lastBlockNumber, getReceipt, onReceipt, onCheck, pendingTransactions, fastForwardBlockNumber]);

  return null;
}
