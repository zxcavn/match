import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { OperationStatus, OperationStatusState, TransactionHash } from '@/components/atoms';

import BaseOperationBlock from './BaseOperationBlock';
import { getOperationBlockConfig, OperationBlockType } from './constants';

type Props = {
  type: OperationBlockType;
  /** @type {FormattedMessageId} */
  title: string;
  currencyBadgesSlot: ReactNode;
  actionSlot: ReactNode;
  transaction: {
    hash: string;
    explorerUrl: string;
  };
};

const SuccessOperationBlock = ({ type, title, currencyBadgesSlot, actionSlot, transaction }: Props) => {
  const { color } = getOperationBlockConfig(type);

  return (
    <BaseOperationBlock
      color={color}
      sx={{
        '&': {
          padding: { md: '5.625rem 3.5rem', xs: '3.5rem 1.25rem 3rem' },
        },
      }}
    >
      <Stack mb="1.5rem" gap="3rem" alignItems="center">
        <OperationStatus color={color} state={OperationStatusState.SUCCESS} />
        <Typography variant="h2" color="background.light">
          <FormattedMessage id={title} />
        </Typography>
      </Stack>
      <Stack justifyContent="center" mb="2rem" direction="row" alignItems="center" gap="0.5rem">
        {currencyBadgesSlot}
      </Stack>
      <TransactionHash sx={{ mb: '2rem' }} hash={transaction.hash} href={transaction.explorerUrl} />
      <Stack alignItems="center">{actionSlot}</Stack>
    </BaseOperationBlock>
  );
};

export default SuccessOperationBlock;
