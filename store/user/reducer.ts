import { createReducer } from '@reduxjs/toolkit';

import { deletePersistedConnectionMeta, getPersistedConnectionMeta } from '@/connection/meta';
import { ConnectionType } from '@/connection/types';

import { updateSelectedWallet } from './actions';

const selectedWallet = getPersistedConnectionMeta()?.type;

const currentTimestamp = () => new Date().getTime();

interface UserState {
  timestamp: number;
  selectedWallet?: ConnectionType;
}

const initialState: UserState = {
  timestamp: currentTimestamp(),
  selectedWallet,
};

export default createReducer(initialState, builder =>
  builder.addCase(updateSelectedWallet, (state, action) => {
    const wallet = action.payload.wallet;

    if (!wallet) {
      deletePersistedConnectionMeta();
    }

    state.selectedWallet = wallet;
  })
);
