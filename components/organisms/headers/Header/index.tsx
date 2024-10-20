import { Stack } from '@mui/material';
import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useActiveWeb3React, useDisconnectWallet, useGetPageColor, useIsRootPage } from '@/hooks';
import { Icon, ThemeToggle } from '@/lib/xfi.lib/components/atoms';

import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { LogoIcon, LogoMiniIcon } from '@/public/icons';
import { PAGES } from '@/shared/constants';

import { LinkButton } from '@/components/atoms';

import { StyledActionsBlock, StyledHeader } from './styles';

const getLogoConfig = (isMobile: boolean) =>
  isMobile ? { icon: LogoMiniIcon, viewBox: '0 0 54 42' } : { icon: LogoIcon, viewBox: '0 0 179 42' };

const Header = () => {
  const { formatMessage } = useIntl();
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));

  const isRootPage = useIsRootPage();
  const { disconnect } = useDisconnectWallet();
  const pageColor = useGetPageColor();
  const { connector } = useActiveWeb3React();

  const logoConfig = useMemo(() => getLogoConfig(isTablet), [isTablet]);

  const handleLogoutClick = () => {
    disconnect();
  };

  return (
    <StyledHeader>
      <Stack direction={'row'} gap={'2.5rem'} alignItems={'center'}>
        <Link href={PAGES.dashboard.pathname}>
          <Icon src={logoConfig.icon} viewBox={logoConfig.viewBox} className="logoContainer" />
        </Link>
        {!isTablet && (
          <Stack direction={'row'} gap={'1.5rem'}>
            <LinkButton
              text={formatMessage({ id: 'PAGE.DASHBOARD' })}
              href={PAGES.dashboard.pathname}
              isActive={isRootPage}
              pageColor={pageColor}
            />
            <LinkButton
              text={formatMessage({ id: 'SUMMARY.OPERATIONS' })}
              href={PAGES.swap.pathname}
              isActive={!isRootPage}
              pageColor={pageColor}
            />
          </Stack>
        )}
      </Stack>
      <StyledActionsBlock>
        <ThemeToggle size={'large'} />
        <Stack
          direction={'row'}
          order={isTablet ? -1 : 0}
          width={{ lg: 'initial', xs: '100%' }}
          justifyContent={'flex-end'}
        ></Stack>
      </StyledActionsBlock>
    </StyledHeader>
  );
};

export default memo(Header);
