import { Box, styled, SxProps } from '@mui/material';
import { ReactElement, useMemo } from 'react';

import { Block as BaseBlock, BlockProps } from '@/lib/xfi.lib/components/atoms/Block';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { AppThemeVariant, useMediaQuery } from '@/lib/xfi.lib/theme';
import { useTheme } from '@/lib/xfi.lib/theme/ThemeProvider';

import Glow, { GlowProps } from '../Glow';

type Props = Omit<BlockProps, 'variant'> & {
  glowColor?: string;
  extraSlot?: ReactElement;
  extraSlotSx?: SxProps;
};

const SHOW_EXTRA_SLOT_BREAKPOINT = 1400;

const Block = ({ children, glowColor, extraSlot, extraSlotSx, ...blockProps }: Props) => {
  const { themeVariant } = useTheme();
  const isShowExtraSlot = useMediaQuery(theme => theme.breakpoints.up(SHOW_EXTRA_SLOT_BREAKPOINT));
  const isShowGlow = themeVariant === AppThemeVariant.dark && isShowExtraSlot && extraSlot;

  const glowPropList = useMemo(
    () => (!!glowColor && isShowGlow ? getGlowPropList(glowColor) : []),
    [glowColor, isShowGlow]
  );

  return (
    <StyledBlock $glowColor={glowColor} variant="transparent" {...blockProps}>
      <Box position="relative" zIndex={3}>
        {children}
      </Box>

      {isShowExtraSlot && extraSlot && (
        <>
          <StyledExtraContainer sx={extraSlotSx}>{extraSlot}</StyledExtraContainer>
          {glowPropList.map((props, index) => (
            <Glow key={`glow-${index}`} {...props} />
          ))}
        </>
      )}
    </StyledBlock>
  );
};

const getGlowPropList = (color: string): GlowProps[] => [
  {
    x: 85,
    y: 50,
    rotation: 140,
    color: color,
  },
  {
    x: 100,
    y: 50,
    rotation: 40,
    color: color,
  },
];

const StyledExtraContainer = styled('div', { name: 'StyledExtraContainer' })(() => ({
  position: 'absolute',
  zIndex: 2,
  top: '50%',
  right: '0',
  transform: 'translate(35%, -50%)',
  pointerEvents: 'none',
}));

const StyledBlock = styled(BaseBlock, { name: 'StyledBlock', shouldForwardProp })<{ $glowColor?: string }>(
  ({ theme, $glowColor }) => ({
    '&': {
      borderRadius: '1rem',
    },

    ...($glowColor && {
      // border
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-1px',
        left: '50%',
        width: '60%',
        height: '1px',
        borderRadius: '70%',
        backgroundImage: `linear-gradient(90deg, rgba(10, 165, 217, 0.1) 0%, ${$glowColor} 51%, rgba(10, 165, 217, 0.1) 100%)`,
        transform: 'translate(-50%, 0)',
      },

      // shadow
      '&:after': {
        content: '""',
        position: 'absolute',
        top: theme.palette.mode === AppThemeVariant.dark ? '-0.5rem' : '-0.125rem',
        left: '50%',
        width: '70%',
        height: theme.palette.mode === AppThemeVariant.dark ? '1rem' : '0.25rem',
        borderRadius: '100%',
        filter: 'blur(12px)',
        backgroundColor: $glowColor,
        transform: 'translate(-50%, 0)',
      },
    }),
  })
);

export default Block;
