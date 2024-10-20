import { Stack, Typography } from '@mui/material';
import { type ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { OperationStatus, OperationStatusState, TransactionHash } from '@/components/atoms';

import BaseOperationBlock from './BaseOperationBlock';
import { getOperationBlockConfig, OperationBlockType } from './constants';

type Props = {
  /** @type {FormattedMessageId} */
  title: string;
  type: OperationBlockType;
  currencyBadgesSlot: ReactNode;
  txHash?: string;
};

const LoadingOperationBlock = ({ title, type, currencyBadgesSlot, txHash }: Props) => {
  const { color } = getOperationBlockConfig(type);

  return (
    <BaseOperationBlock
      color={color}
      sx={{
        '&': {
          padding: { md: '5.625rem 3.5rem', xs: '3rem 1.25rem 5.625rem' },
        },
      }}
    >
      <Stack mb="1.5rem" gap="3rem" alignItems="center">
        <OperationStatus color={color} state={OperationStatusState.LOADING} />
        <Typography variant="h2" color="background.light">
          <FormattedMessage id={title} />
        </Typography>
      </Stack>
      <Stack mb="2rem" direction="row" justifyContent="center" alignItems="center" gap="0.5rem">
        {currencyBadgesSlot}
      </Stack>
      {txHash && <TransactionHash hash={txHash} />}
    </BaseOperationBlock>
  );
};

export default LoadingOperationBlock;
