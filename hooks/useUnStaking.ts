import { TransactionResponse } from '@ethersproject/providers';
import { NumberFormatter } from '@xfi/formatters';
import { BigNumber, Contract } from 'ethers';
import { useCallback, useMemo } from 'react';

import { DEFAULT_DECIMALS } from '@/shared/constants';
import { TxTemplateTypes } from '@/store/transactions/types';

import useTxTemplate from './useTxTemplate';

const useUnStaking = (
  contract: Contract | null,
  amount: BigNumber | undefined,
  setPendingUnstakeTx: (v: string) => void
) => {
  const value = useMemo(() => (amount ? amount : BigNumber.from(0)), [amount]);

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.withdraw(value);
  }, [contract, value]);

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingUnstakeTx(tx.hash);
    },
    [setPendingUnstakeTx]
  );

  return useTxTemplate(
    TxTemplateTypes.Unstaked,
    `$unstake_${value.toString()}`,
    `Withdraw ${NumberFormatter.formatUnitsToDisplay(value.toString(), {
      decimals: DEFAULT_DECIMALS,
    })} LP from staking`,
    dataFunc,
    setTx
  );
};

export default useUnStaking;
