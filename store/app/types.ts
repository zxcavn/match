import { ErrorType } from '@/shared/types';

export const SLICE_NAME = 'APP';

export const enum AppFetchMethodsEnum {
  initAppAsync = `${SLICE_NAME}/initAppAsync`,
}

export type AutoLockData = {
  expiresIn: number;
  timer: number;
};

export interface AppState {
  loading: boolean;
  error: ErrorType;
}
