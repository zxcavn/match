import { BigNumber } from 'ethers';
import { useEffect, useReducer, useState } from 'react';

import useActiveWeb3React from './useActiveWeb3React';

type UseNativeCurrencyBalanceResult = {
  balance: BigNumber;
  updateBalance: () => void;
};

function useNativeCurrencyBalance(): UseNativeCurrencyBalanceResult {
  const { account, provider } = useActiveWeb3React();
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [triggerKey, updateTriggerKey] = useReducer(state => state + 1, 0);

  useEffect(() => {
    if (account && provider) {
      provider
        .getBalance(account)
        .then(setBalance)
        .catch(() => {
          setBalance(BigNumber.from(0));
        });
    }
  }, [account, provider, triggerKey]);

  return { balance, updateBalance: updateTriggerKey };
}

export default useNativeCurrencyBalance;
