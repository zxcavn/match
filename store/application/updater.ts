import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { useAppDispatch, useDebounce, useIsWindowVisible } from '@/hooks';
import { asSupportedChain } from '@/shared/constants';

import { updateChainId } from './actions';

function ApplicationUpdater(): null {
  const { chainId, provider } = useWeb3React();
  const dispatch = useAppDispatch();
  const windowVisible = useIsWindowVisible();

  const [activeChainId, setActiveChainId] = useState(chainId);

  useEffect(() => {
    if (provider && chainId && windowVisible) {
      setActiveChainId(chainId);
    }
  }, [dispatch, chainId, provider, windowVisible]);

  const debouncedChainId = useDebounce(activeChainId, 100);

  useEffect(() => {
    const chainId = debouncedChainId ? asSupportedChain(debouncedChainId) : null;

    dispatch(updateChainId({ chainId: chainId as any }));
  }, [dispatch, debouncedChainId]);

  return null;
}

export default ApplicationUpdater;
