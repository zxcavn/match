import { SxProps } from '@mui/material';
import type { ImageProps } from 'next/image';

import { APP_COLORS } from '@/shared/constants';

export enum OperationBlockType {
  GET,
  SWAP,
  STAKING,
  REWARDS,
  ESCROW,
  XUSD,
}

type Config = {
  color: string;
  imageProps: Pick<ImageProps, 'src' | 'alt' | 'width' | 'height'>;
  sx?: SxProps;
};
type OperationBlockConfig = Record<OperationBlockType, Config>;

const OPERATION_BLOCK_CONFIG: OperationBlockConfig = {
  [OperationBlockType.GET]: {
    color: APP_COLORS.page.get,
    imageProps: {
      src: '/images/operations/get.png',
      alt: 'get',
      width: 554,
      height: 554,
    },
  },
  [OperationBlockType.SWAP]: {
    color: APP_COLORS.page.swap,
    imageProps: {
      src: '/images/operations/swap.png',
      alt: 'swap',
      width: 385,
      height: 385,
    },
  },
  [OperationBlockType.STAKING]: {
    color: APP_COLORS.page.staking,
    imageProps: {
      src: '/images/operations/staking.png',
      alt: 'staking',
      width: 370,
      height: 370,
    },
  },
  [OperationBlockType.REWARDS]: {
    color: APP_COLORS.page.rewards,
    imageProps: {
      src: '/images/operations/rewards.png',
      alt: 'rewards',
      width: 670,
      height: 670,
    },
  },
  [OperationBlockType.ESCROW]: {
    color: APP_COLORS.page.escrow,
    imageProps: {
      // TODO: Add other image
      src: '/images/operations/xusd.png',
      alt: 'escrow',
      width: 370,
      height: 370,
    },
  },
  [OperationBlockType.XUSD]: {
    color: APP_COLORS.page.xusd,
    imageProps: {
      src: '/images/operations/xusd.png',
      alt: 'xusd',
      width: 370,
      height: 370,
    },
  },
};

export const getOperationBlockConfig = (type: OperationBlockType): Config => {
  return OPERATION_BLOCK_CONFIG[type] || OPERATION_BLOCK_CONFIG[OperationBlockType.GET];
};
