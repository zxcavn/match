import { styled } from '@mui/material';

export const StyledFormContainer = styled('div', { name: 'StyledFormContainer' })(({ theme }) => ({
  'form > div': {
    [theme.breakpoints.down('md')]: {
      gap: '1.5rem',
    },
  },
}));
