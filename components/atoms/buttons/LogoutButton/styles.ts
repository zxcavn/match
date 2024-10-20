import { styled } from '@mui/material';

import { Button } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledLogoutButton = styled(Button, { name: 'StyledLogoutButton' })(({ theme }) => ({
  '.logoutIcon': {
    path: {
      stroke: theme.palette.mode === AppThemeVariant.dark ? theme.palette.common.white : theme.palette.primary.main,
    },
  },

  '&&': {
    width: 'initial',
    padding: '0 0.75rem',

    '.buttonChildren': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',

      '.connectorIcon': {
        width: '2rem',
        height: '2rem',
      },

      [theme.breakpoints.down('md')]: {
        minWidth: '2.75rem',
      },
    },
  },
}));
