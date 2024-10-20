import type { Locale } from 'date-fns';
import en from 'date-fns/locale/en-US';

import { AppLocale } from '@/lib/i18n';
import { OptionType } from '@/lib/xfi.lib/components/atoms';

export const LANGUAGES: OptionType<AppLocale>[] = [
  {
    value: 'en',
    label: {
      type: 'text',
      text: 'English',
    },
  },
];

export const DATE_LOCALES: Record<AppLocale, Locale> = {
  en,
};
