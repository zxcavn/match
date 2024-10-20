import { createAction } from '@reduxjs/toolkit';

export const updateSelectedWallet = createAction<{ wallet: any }>('user/updateSelectedWallet');
