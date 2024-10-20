import { styled } from '@mui/material';

export const StyledInputContainer = styled('div', { name: 'StyledInputContainer' })(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  '& .startAdornment': {
    display: 'flex',
    alignItems: 'center',
  },

  '& .endAdorned': {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    height: 'fit-content',
    flexShrink: 0,
    cursor: 'pointer',
    marginLeft: '1rem',
    zIndex: 2,
  },

  '.MuiInputBase-input': {
    padding: 0,
  },

  '.MuiInputBase-inputMultiline': {
    overflow: 'visible',
    whiteSpace: 'normal',
  },

  '& .labelWrapper': {
    paddingLeft: '1.0625rem',
    display: 'flex',
    gap: 2,

    '& .isRequired': {
      color: theme.palette.alerts.error,
    },
  },

  '& .captionWrapper': {
    position: 'absolute',
    bottom: '-1.56rem',
    paddingLeft: '1rem',
    color: theme.palette.neutrals.secondaryText,

    '&.isError': {
      color: theme.palette.alerts.error,
    },
  },

  '& .captionSpace': { height: '1.25rem' },

  '& .MuiInputBase-root:not(.isEditable)': {
    input: {
      color: theme.palette.background.light,
      WebkitTextFillColor: theme.palette.background.light,
    },
  },
}));
