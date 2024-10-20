import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initAppAsync } from './thunk';
import { AppState, SLICE_NAME } from './types';

const initialState: AppState = {
  loading: true,
  error: null,
};

const appSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    setAppLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initAppAsync.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(initAppAsync.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(initAppAsync.rejected, (state, { payload }) => {
      state.loading = false;

      if (payload) state.error = payload;
    });
  },
});

export default appSlice.reducer;
