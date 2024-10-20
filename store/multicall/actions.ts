import { createAction } from '@reduxjs/toolkit';

import { Call } from './utils';

interface ListenerOptions {
  readonly blocksPerFetch: number;
}

export const addMulticallListeners = createAction<{ chainId: number; calls: Call[]; options: ListenerOptions }>(
  'multicall/addMulticallListeners'
);
export const removeMulticallListeners = createAction<{ chainId: number; calls: Call[]; options: ListenerOptions }>(
  'multicall/removeMulticallListeners'
);
export const fetchingMulticallResults = createAction<{ chainId: number; calls: Call[]; fetchingBlockNumber: number }>(
  'multicall/fetchingMulticallResults'
);
export const errorFetchingMulticallResults = createAction<{
  chainId: number;
  calls: Call[];
  fetchingBlockNumber: number;
}>('multicall/errorFetchingMulticallResults');
export const updateMulticallResults = createAction<{
  chainId: number;
  blockNumber: number;
  results: {
    [callKey: string]: string | null;
  };
}>('multicall/updateMulticallResults');
