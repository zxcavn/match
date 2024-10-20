import { Stack, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

type Props = {
  color: string;
};

const LayoutBlurredShape = ({ color }: Props) => {
  return (
    <StyledBlurredShape $color={color}>
      <div className={'blurredBackgroundStyles'} />
    </StyledBlurredShape>
  );
};

const StyledBlurredShape = styled(Stack, { name: 'StyledBlurredShape', shouldForwardProp })<{
  $color: string;
}>(({ $color }) => ({
  position: 'absolute',
  top: '-35.375rem',
  left: '-20.75rem',
  width: '28.5rem',
  height: '40.5625rem',
  transform: 'rotate(124.74deg)',

  '& .blurredBackgroundStyles': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: $color,
    filter: 'blur(12.5rem)',
    zIndex: 1,
  },
}));

export default LayoutBlurredShape;
