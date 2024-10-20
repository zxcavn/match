import { combineReducers } from '@reduxjs/toolkit';

import localeReducer from '@/lib/i18n/i18n';
import appReducer from '@/store/app/slice';
import applicationReducer from '@/store/application/reducer';
import multiCallReducer from '@/store/multicall/reducer';
import notificationsReducer from '@/store/notifications/slice';
import transactionsReducer from '@/store/transactions/reducer';
import userReducer from '@/store/user/reducer';
import walletsReducer from '@/store/wallets/reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  wallets: walletsReducer,
  notifications: notificationsReducer,
  locale: localeReducer,
  application: applicationReducer,
  multicall: multiCallReducer,
  transactions: transactionsReducer,
});
