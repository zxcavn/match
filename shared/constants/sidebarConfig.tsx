import { ReactNode } from 'react';

import {
  DashboardIcon,
  EscrowIcon,
  GetIcon,
  RewardsIcon,
  SelectedDashboardIcon,
  SelectedEscrowIcon,
  SelectedGetIcon,
  SelectedRewardsIcon,
  SelectedStakeIcon,
  SelectedSwapIcon,
  SelectedXusdIcon,
  StakeIcon,
  SwapIcon,
  XUsdIcon,
} from '@/icons';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { PAGES } from '@/shared/constants';

export type SidebarItem = {
  title: string;
  href: string;
  icon: ReactNode;
  selectedIcon: ReactNode;
  extra?: ReactNode;
};
const defaultIconProps = { viewBox: '0 0 48 48', sx: { fontSize: '3rem' } };

export const SIDEBAR_CONFIG: SidebarItem[] = [
  {
    title: 'PAGE.DASHBOARD',
    href: PAGES.dashboard.pathname,
    icon: <Icon src={DashboardIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedDashboardIcon} {...defaultIconProps} />,
  },
  {
    title: 'PAGE.SWAP',
    href: PAGES.swap.pathname,
    icon: <Icon src={SwapIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedSwapIcon} {...defaultIconProps} />,
  },
  {
    title: 'PAGE.LP_TOKENS',
    href: PAGES.get.pathname,
    icon: <Icon src={GetIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedGetIcon} {...defaultIconProps} />,
  },
  {
    title: 'PAGE.STAKING',
    href: PAGES.staking.pathname,
    icon: <Icon src={StakeIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedStakeIcon} {...defaultIconProps} />,
  },
  {
    title: 'PAGE.REWARDS',
    href: PAGES.rewards.pathname,
    icon: <Icon src={RewardsIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedRewardsIcon} {...defaultIconProps} />,
  },
  {
    title: 'PAGE.ESCROW',
    href: PAGES.escrow.pathname,
    icon: <Icon src={EscrowIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedEscrowIcon} {...defaultIconProps} />,
  },
  {
    title: 'PAGE.X_USD',
    href: PAGES.xusd.pathname,
    icon: <Icon src={XUsdIcon} {...defaultIconProps} />,
    selectedIcon: <Icon src={SelectedXusdIcon} {...defaultIconProps} />,
  },
];
