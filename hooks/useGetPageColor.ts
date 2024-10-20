import { useTheme } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/router';

import { APP_COLORS, PAGES } from '@/shared/constants';

import useIsRootPage from './useIsRootPage';

const useGetPageColor = () => {
  const isRootPage = useIsRootPage();
  const theme = useTheme();
  const { asPath } = useRouter();

  const pageColors = getPageColors(theme);

  if (isRootPage) return theme.palette.primary.main;

  return pageColors[asPath as PagePathNames] || theme.palette.primary.main;
};

type PagePathNames = typeof PAGES[keyof typeof PAGES]['pathname'];

const getPageColors = (theme: Theme): Partial<Record<PagePathNames, string>> => ({
  [PAGES.dashboard.pathname]: theme.palette.primary.main,
  [PAGES.get.pathname]: APP_COLORS.page.get,
  [PAGES.swap.pathname]: APP_COLORS.page.swap,
  [PAGES.staking.pathname]: APP_COLORS.page.staking,
  [PAGES.rewards.pathname]: APP_COLORS.page.rewards,
  [PAGES.escrow.pathname]: APP_COLORS.page.escrow,
  [PAGES.xusd.pathname]: APP_COLORS.page.xusd,
});

export default useGetPageColor;
