import { Stack, StackProps, styled } from '@mui/material';
import { useId } from 'react';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { FailStatusIcon, SuccessStatusIcon } from '@/public/icons';

export enum OperationStatusState {
  LOADING,
  SUCCESS,
  FAIL,
}

type Props = {
  state: OperationStatusState;
  color: string;
} & Pick<StackProps, 'className' | 'sx'>;

const OperationStatus = ({ state, color, ...stackProps }: Props) => {
  return (
    <StyledOperationStatusContainer {...stackProps}>
      {state === OperationStatusState.LOADING && <LoadingAnimation color={color} />}
      {state === OperationStatusState.SUCCESS && <Success color={color} />}
      {state === OperationStatusState.FAIL && <Fail />}
    </StyledOperationStatusContainer>
  );
};

const LoadingAnimation = ({ color }: Pick<Props, 'color'>) => {
  const id = useId();

  return (
    <StyledLoadingContainer viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="97" height="97" rx="48.5" stroke={`url(#${id})`} stroke-width="3" />
      <defs>
        <linearGradient id={id} x1="77.4725" y1="9.06594" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color={color} />
          <stop offset="1" stop-color="#00000000" />
        </linearGradient>
      </defs>
    </StyledLoadingContainer>
  );
};

const Success = ({ color }: Pick<Props, 'color'>) => {
  return (
    <Icon
      src={SuccessStatusIcon}
      viewBox="0 0 100 100"
      sx={{
        width: '100%',
        height: '100%',
        '*': { stroke: color },
        path: { fill: color },
      }}
    />
  );
};

const Fail = () => {
  return <Icon src={FailStatusIcon} viewBox="0 0 108 108" sx={{ width: '100%', height: '100%' }} />;
};

const StyledOperationStatusContainer = styled(Stack, { name: 'StyledOperationStatusContainer' })(({ theme }) => ({
  width: '6.25rem',
  height: '6.25rem',

  [theme.breakpoints.down('md')]: {
    width: '4rem',
    height: '4rem',
  },
}));

const StyledLoadingContainer = styled('svg', { name: 'StyledSvg', shouldForwardProp })(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',

  animation: 'loadingAnimation 1.3s linear',
  animationIterationCount: 'infinite',

  '@keyframes loadingAnimation': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

export default OperationStatus;
