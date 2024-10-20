import { useMemo } from 'react';

import useActiveWeb3React from './useActiveWeb3React';
import { useWarningFlag } from './useWarningFlag';

const useIsAuthenticated = () => {
  const { chainId, account } = useActiveWeb3React();

  const { notSupportedChain } = useWarningFlag();

  const isWalletConnected = !!chainId && !!account;

  return useMemo(() => {
    return !notSupportedChain && isWalletConnected;
  }, [notSupportedChain, isWalletConnected]);
};

export default useIsAuthenticated;
