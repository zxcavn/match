import { useCallback } from 'react';

import { updateSelectedWallet } from '@/store/user/actions';

import useActiveWeb3React from './useActiveWeb3React';
import useAppDispatch from './useAppDispatch';

export default function useDisconnectWallet() {
  const dispatch = useAppDispatch();
  const { connector } = useActiveWeb3React();

  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }

    connector.resetState();
    dispatch(updateSelectedWallet({ wallet: undefined }));
  }, [connector, dispatch]);

  return { disconnect };
}
