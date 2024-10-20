import { TransactionResponse } from '@ethersproject/providers';
import { NumberFormatter } from '@xfi/formatters';
import { BigNumber, Contract } from 'ethers';
import { useCallback, useMemo } from 'react';

import { DEFAULT_DECIMALS } from '@/shared/constants';
import { TxTemplateTypes } from '@/store/transactions/types';

import useTxTemplate from './useTxTemplate';

const useStaking = (contract: Contract | null, amount: BigNumber | undefined, setPendingTx: (v: string) => void) => {
  const value = useMemo(() => (amount ? amount : BigNumber.from(0)), [amount]);

  const dataFunc = useCallback(async () => {
    if (!value) return;
    return await contract?.populateTransaction.stake(value);
  }, [contract, value]);

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx(tx.hash);
    },
    [setPendingTx]
  );

  return useTxTemplate(
    TxTemplateTypes.Staking,
    `$stake_${value.toString()}`,
    `Staked ${NumberFormatter.formatUnitsToDisplay(value.toString(), { decimals: DEFAULT_DECIMALS })} LP tokens`,
    dataFunc,
    setTx
  );
};

export default useStaking;
