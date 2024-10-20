import { Stack } from '@mui/material';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { Block } from '@/components/atoms';

import { getOperationBlockConfig, OperationBlockType } from './constants';

type Props = PropsWithChildren<{
  type: OperationBlockType;
}>;

const CHANGE_WIDTH_BREAKPOINT = 1400;

const OperationBlock = ({ type, children }: Props) => {
  const { color, imageProps, sx } = getOperationBlockConfig(type);
  const isLargeDesktop = useMediaQuery(theme => theme.breakpoints.up(CHANGE_WIDTH_BREAKPOINT));
  const maxContentWidth = isLargeDesktop ? '31.875rem' : '100%';

  return (
    <Block
      glowColor={color}
      extraSlotSx={sx}
      extraSlot={
        <Image src={imageProps.src} alt={imageProps.alt} width={imageProps.width} height={imageProps.height} />
      }
      sx={{
        '&': {
          padding: { md: '5.625rem 3.5rem', xs: '2rem 1.25rem' },
        },
      }}
      minHeight={{ md: '33.125rem' }}
    >
      <Stack zIndex={1} width="100%" maxWidth={maxContentWidth}>
        {children}
      </Stack>
    </Block>
  );
};

export default OperationBlock;
