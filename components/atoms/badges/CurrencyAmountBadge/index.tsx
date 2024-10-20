import { alpha, Stack, StackProps, styled, Typography } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { theme } from '@/lib/xfi.lib/theme';
import { APP_COLORS } from '@/shared/constants';

export enum CurrencyAmountBadgeColorStyle {
  GRAY,
  BLUE,
}

type Props = {
  currency: string;
  amount: string;
  colorStyle?: CurrencyAmountBadgeColorStyle;
} & Pick<StackProps, 'sx' | 'className'>;

const CurrencyAmountBadge = ({
  currency,
  amount,
  colorStyle = CurrencyAmountBadgeColorStyle.GRAY,
  ...stackProps
}: Props) => {
  const { color, bgColor } = BADGE_COLOR_CONFIG[colorStyle] || BADGE_COLOR_CONFIG[CurrencyAmountBadgeColorStyle.GRAY];

  return (
    <StyledBadgeContainer $color={color} $bgColor={bgColor} {...stackProps}>
      <Typography variant="subtitle1" color="inherit">
        {currency}
      </Typography>
      <Typography variant="body1" color="inherit">
        {amount}
      </Typography>
    </StyledBadgeContainer>
  );
};

const BADGE_COLOR_CONFIG: Record<CurrencyAmountBadgeColorStyle, { color: string; bgColor: string }> = {
  [CurrencyAmountBadgeColorStyle.BLUE]: {
    color: APP_COLORS.badgePrimary,
    bgColor: alpha(APP_COLORS.badgePrimary, 0.15),
  },
  [CurrencyAmountBadgeColorStyle.GRAY]: {
    color: theme.palette.neutrals.secondaryText,
    bgColor: alpha(theme.palette.neutrals.border, 0.25),
  },
};

const StyledBadgeContainer = styled(Stack, { name: 'StyledBadgeContainer', shouldForwardProp })<{
  $color: string;
  $bgColor: string;
}>(({ $color, $bgColor }) => ({
  height: '1.5rem',
  width: 'fit-content',
  padding: '0 0.5rem',
  borderRadius: '1.5rem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25rem',
  color: $color,
  backgroundColor: $bgColor,
}));

export default CurrencyAmountBadge;
