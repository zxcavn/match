import { useCallback } from 'react';

import { switchToNetwork } from '@/helpers';

import useActiveWeb3React from './useActiveWeb3React';

const useHandleChainSwitch = (toggle?: (targetChain: number) => void) => {
  const { library, connector } = useActiveWeb3React();

  const handleChainSwitch = useCallback(
    (targetChain: number, skipToggle?: boolean) => {
      if (!library?.provider) return;

      switchToNetwork({ connector, provider: library.provider, chainId: targetChain })
        .then(() => {
          if (!skipToggle) {
            toggle && toggle(targetChain);
          }
        })
        .catch(error => {
          console.error('Failed to switch networks', error);

          // we want app network <-> chainId param to be in sync, so if user changes the network by changing the URL
          // but the request fails, revert the URL back to current chainId

          if (!skipToggle) {
            toggle && toggle(targetChain);
          }
        });
    },
    [library, toggle]
  );

  return handleChainSwitch;
};

export default useHandleChainSwitch;
