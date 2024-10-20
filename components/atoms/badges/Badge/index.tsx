import { alpha, Stack, StackProps, styled, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { theme } from '@/lib/xfi.lib/theme';
import { APP_COLORS } from '@/shared/constants';

export enum BadgeColorStyle {
  GRAY,
  BLUE,
  PURPLE,
}

type Props = {
  title: string;
  colorStyle?: BadgeColorStyle;
} & Pick<StackProps, 'sx' | 'className'>;

const Badge = ({ title, colorStyle = BadgeColorStyle.GRAY, ...stackProps }: Props) => {
  const { color, bgColor } = BADGE_COLOR_CONFIG[colorStyle] || BADGE_COLOR_CONFIG[BadgeColorStyle.GRAY];
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <StyledBadge $color={color} $bgColor={bgColor} {...stackProps}>
      <Typography variant="body2" color="inherit">
        {isFormattedMessageId(title) ? <FormattedMessage id={title} /> : title}
      </Typography>
    </StyledBadge>
  );
};

const BADGE_COLOR_CONFIG: Record<BadgeColorStyle, { color: string; bgColor: string }> = {
  [BadgeColorStyle.BLUE]: {
    color: APP_COLORS.badgePrimary,
    bgColor: alpha(APP_COLORS.badgePrimary, 0.15),
  },
  [BadgeColorStyle.GRAY]: {
    color: theme.palette.neutrals.secondaryText,
    bgColor: alpha(theme.palette.neutrals.border, 0.25),
  },
  [BadgeColorStyle.PURPLE]: {
    color: APP_COLORS.badgePurple,
    bgColor: alpha(APP_COLORS.badgePurple, 0.3),
  },
};

const StyledBadge = styled(Stack, { name: 'StyledBadge', shouldForwardProp })<{
  $color: string;
  $bgColor: string;
}>(({ $color, $bgColor }) => ({
  height: '1.5rem',
  width: 'fit-content',
  padding: '0.25rem 0.375rem',
  borderRadius: '1.5rem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25rem',
  color: $color,
  backgroundColor: $bgColor,
}));

export default Badge;
