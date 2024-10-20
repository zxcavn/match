import { createAction } from '@reduxjs/toolkit';

import type { AddNotificationPayload } from '../notifications/types';

export enum PopupType {
  Transaction = 'transaction',
  Order = 'order',
  FailedSwitchNetwork = 'failedSwitchNetwork',
}

export type PopupContent = AddNotificationPayload;

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
  POOL_OVERVIEW_OPTIONS,
  NETWORK_SELECTOR,
  DISCONNECT,
}

export enum ApplicationSubModal {}

export const updateChainId = createAction<{ chainId: number | null }>('application/updateChainId');
export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>(
  'application/updateBlockNumber'
);
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal');
export const setOpenSubModal = createAction<ApplicationSubModal | null>('application/setOpenSubModal');
export const setOpenTimerView = createAction<boolean>('application/setOpenTimerView');
export const setctxStakingPositionId = createAction<string | null>('application/setctxStakingPositionId');
export const setctxVotingPositionId = createAction<string | null>('application/setctxVotingPositionId');
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'application/addPopup'
);
export const removePopup = createAction<{ key: string }>('application/removePopup');
