import { styled } from '@mui/material';

import { Button } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledSwapButton = styled(Button, { name: 'StyledSwapButton' })(({ theme }) => ({
  backdropFilter: 'blur(2rem)',
  zIndex: 1,
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 85%)',

  'svg > path': {
    stroke:
      theme.palette.mode === AppThemeVariant.dark ? theme.palette.neutrals.buttonText : theme.palette.primary.main,
  },
}));

export const StyledFormContainer = styled('div', { name: 'StyledFormContainer' })(({ theme }) => ({
  'form > div': {
    [theme.breakpoints.down('md')]: {
      gap: '1.5rem',
    },
  },
}));
