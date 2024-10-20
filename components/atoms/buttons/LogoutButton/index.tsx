import type { ElementType } from 'react';

import { Icon, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { LogoutIcon } from '@/lib/xfi.lib/icons';
import type { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { StyledLogoutButton } from './styles';

export const TEST_ID = 'logout-button-test-id';

export type Props = {
  handleLogoutClick: () => void;
  connectorIcon: ElementType | ThemeIcon;
};

const LogoutButton = ({ handleLogoutClick, connectorIcon }: Props) => {
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));

  return (
    <Tooltip
      title={'SUMMARY.LOG_OUT'}
      placement={'bottom'}
      componentsProps={tooltipComponentsProps}
      enterNextDelay={150}
    >
      <StyledLogoutButton onClick={handleLogoutClick} size="largeIcon" variant={'secondary'} data-testid={TEST_ID}>
        {isTablet && <Icon className="connectorIcon" src={connectorIcon} viewBox={'0 0 32 32'} />}
        <Icon className="logoutIcon" src={LogoutIcon} viewBox={'0 0 20 20'} sx={{ fontSize: '1.25rem' }} />
      </StyledLogoutButton>
    </Tooltip>
  );
};

const tooltipComponentsProps = {
  tooltip: {
    sx: { '&&&': { marginLeft: '0.875rem', padding: '0.69rem 0.75rem' } },
  },
};

export default LogoutButton;
