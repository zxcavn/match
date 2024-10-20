import { styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledLinkButton = styled('div', { name: 'StyledLinkButton', shouldForwardProp })<{ $pageColor?: string }>(
  ({ theme, $pageColor }) => ({
    position: 'relative',
    padding: '0.875rem 3rem 0.8125rem',
    overflowY: 'clip',
    cursor: 'pointer',

    '.line': {
      position: 'absolute',
      bottom: '-0.125rem',
      left: '15%',
      height: '0.1875rem',
      borderRadius: '80%',
      width: '70%',
      backgroundColor: theme.palette.neutrals.light,
      boxShadow: `0px 0px 20px 8px ${theme.palette.neutrals.light}`,
    },

    '&.isActive': {
      h4: {
        color: theme.palette.background.light,
      },

      '.line': {
        backgroundColor: $pageColor,
        boxShadow: `0px 0px 20px 8px ${$pageColor}`,
      },
    },
  })
);
