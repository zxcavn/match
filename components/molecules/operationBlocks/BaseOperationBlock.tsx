import { Stack, SxProps } from '@mui/material';
import type { PropsWithChildren, ReactElement } from 'react';

import { Block } from '@/components/atoms';

type Props = PropsWithChildren<{
  color: string;
  extraSlot?: ReactElement;
  extraSlotSx?: SxProps;
  sx?: SxProps;
}>;

const BaseOperationBlock = ({ children, color, extraSlot, extraSlotSx, sx = {} }: Props) => {
  return (
    <Block
      glowColor={color}
      extraSlot={extraSlot}
      extraSlotSx={extraSlotSx}
      sx={{
        '&': {
          padding: { md: '5.625rem 3.5rem', xs: '2rem 1.25rem 1.25rem' },
        },
        ...sx,
      }}
      minHeight={{ md: '33.125rem' }}
    >
      <Stack width="100%" alignItems="center" maxWidth={{ md: '40.125rem', margin: '0 auto' }}>
        {children}
      </Stack>
    </Block>
  );
};

export default BaseOperationBlock;
