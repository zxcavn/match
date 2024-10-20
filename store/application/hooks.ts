import { useCallback, useMemo } from 'react';

import { pushNotification } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';

import type { AddNotificationPayload } from '../notifications/types';
import { ApplicationModal, PopupContent, setOpenModal } from './actions';

export function useModalOpen(modal: ApplicationModal | string): boolean {
  const openModal = useAppSelector((state: RootState) => state.application.openModal);

  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(setOpenModal(open ? null : modal));
  }, [dispatch, modal, open]);
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
  return useCallback((payload: AddNotificationPayload) => pushNotification(payload), []);
}
