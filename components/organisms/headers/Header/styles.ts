import { alpha, styled } from '@mui/material';

export const StyledHeader = styled('header', { name: 'StyledHeader' })(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  top: 0,
  gap: '2.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.5rem 2.5rem .5rem',
  width: '100%',
  zIndex: theme.zIndex.appBar,
  background: alpha(theme.palette.background.dark, 0.02),
  backdropFilter: 'blur(1.25rem)',

  [theme.breakpoints.down('lg')]: {
    width: '100vw',
    padding: '0.5rem 1rem',
  },

  '& .logoContainer': {
    width: '10.625rem',
    height: 'auto',

    [theme.breakpoints.down('lg')]: {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
}));

export const StyledActionsBlock = styled('div', { name: 'StyledActionsBlock' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  height: '2.5rem',
  maxWidth: '46.5rem',

  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%',
  },
}));
