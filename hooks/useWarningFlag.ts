import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { PAGES, SupportedChainId } from '@/shared/constants';

import useActiveWeb3React from './useActiveWeb3React';

const useIsBridge = () => {
  const { pathname } = useRouter();

  return useMemo(() => {
    return pathname && pathname.indexOf(PAGES.bridge.pathname) >= 0;
  }, [pathname]);
};

export const useWarningFlag = () => {
  const { account, chainId } = useActiveWeb3React();
  const isBridge = useIsBridge();

  if (!chainId) {
    return {
      notSupportedChain: false,
      account,
    };
  }

  if (isBridge) {
    return {
      notSupportedChain: false,
      account,
      lockedForCurrentChain: isBridge && chainId !== SupportedChainId.XFI_TESTNET,
    };
  }

  return {
    notSupportedChain: chainId !== SupportedChainId.XFI_TESTNET,
    account,
  };
};
