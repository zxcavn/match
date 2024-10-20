import { LinkSection } from '@/lib/xfi.lib/components/organisms';
import {
  CROSSFI_BRIDGE_URL,
  CROSSFI_CONSOLE_URL,
  CROSSFI_FINANCE_URL,
  CROSSFI_FOUNDATION_URL,
  CROSSFI_GET_MPX_URL,
  CROSSFI_SCAN_URL,
} from '@/shared/constants/variables';

import addLocale from './addLocale';

export const getFooterLinkSections = (locale: string): LinkSection[] => [
  {
    title: 'SUMMARY.ECOSYSTEM',
    links: [
      {
        title: 'RESOURCES.CROSS_FINANCE',
        href: addLocale(CROSSFI_FINANCE_URL, locale),
        target: '_blank',
      },

      {
        title: 'RESOURCES.CROSS_FI_FOUNDATION',
        href: addLocale(CROSSFI_FOUNDATION_URL, locale),
        target: '_blank',
      },
      {
        title: 'RESOURCES.XFI_SCAN',
        href: addLocale(CROSSFI_SCAN_URL, locale),
        target: '_blank',
      },
      {
        title: 'RESOURCES.XFI_CONSOLE',
        href: addLocale(CROSSFI_CONSOLE_URL, locale),
        target: '_blank',
      },
      {
        title: 'RESOURCES.XFI_BRIDGE',
        href: addLocale(CROSSFI_BRIDGE_URL, locale),
        target: '_blank',
      },
      {
        title: 'RESOURCES.GET_MPX.TITLE',
        href: addLocale(CROSSFI_GET_MPX_URL, locale),
        target: '_blank',
      },
    ],
  },
];
