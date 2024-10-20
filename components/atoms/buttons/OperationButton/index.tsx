import { alpha, Stack, styled, Typography } from '@mui/material';

import { Button, ButtonProps, Icon } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { GasPumpIcon } from '@/public/icons';

export type OperationButtonProps = ButtonProps & {
  color: string;
  feeAmount?: string;
};

const OperationButton = ({ children, color, feeAmount, ...buttonProps }: OperationButtonProps) => {
  return (
    <StyledOperationButton $color={color} type="submit" size="large" variant="primary" isFullWidth {...buttonProps}>
      <Stack direction="row" alignItems="flex-end" gap="0.5rem">
        {children}
        {feeAmount && (
          <Stack direction="row" alignItems="center" gap="0.25rem">
            <Icon src={GasPumpIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />
            <Typography component="span" variant="body1">
              {feeAmount}{' '}
              <Typography component="span" variant="body2">
                {CURRENCIES.xfi.text}
              </Typography>
            </Typography>
          </Stack>
        )}
      </Stack>
    </StyledOperationButton>
  );
};

const StyledOperationButton = styled(Button, { name: 'StyledOperationButton', shouldForwardProp })<{ $color: string }>(
  ({ $color, theme }) => ({
    '&&': {
      background: $color,
      outline: 'none',

      '&&:active': {
        background: $color,
      },

      '&&:disabled': {
        background: alpha($color, 0.6),

        'svg > path': {
          stroke: alpha(theme.palette.common.white, 0.4),
        },
      },

      '&&:before': {
        display: 'none',
      },

      '&&:hover': {
        outline: 'none',
      },
    },
  })
);

export default OperationButton;
