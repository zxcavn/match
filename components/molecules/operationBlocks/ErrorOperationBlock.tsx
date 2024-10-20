import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { OperationStatus, OperationStatusState } from '@/components/atoms';

import BaseOperationBlock from './BaseOperationBlock';
import { getOperationBlockConfig, OperationBlockType } from './constants';

type Props = {
  type: OperationBlockType;
  /** @type {FormattedMessageId | undefined} */
  title?: string;
  /** @type {FormattedMessageId} */
  description: string;
  actionSlot: ReactNode;
};

const ErrorOperationBlock = ({ type, title = 'SUMMARY.FAILED', description, actionSlot }: Props) => {
  const { color } = getOperationBlockConfig(type);

  return (
    <BaseOperationBlock color={color}>
      <Stack mb="1.5rem" gap="3rem" alignItems="center">
        <OperationStatus color={color} state={OperationStatusState.FAIL} />
        <Typography variant="h2" color="background.light">
          <FormattedMessage id={title} />
        </Typography>
      </Stack>
      <Typography mb="2rem" align="center" variant="body1" color="neutrals.secondaryText">
        <FormattedMessage id={description} />
      </Typography>
      <Stack alignItems="center">{actionSlot}</Stack>
    </BaseOperationBlock>
  );
};

export default ErrorOperationBlock;
