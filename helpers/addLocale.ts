import urlJoin from 'url-join';

import { CROSSFI_FINANCE_URL, CROSSFI_FOUNDATION_URL, CROSSFI_SCAN_URL } from '@/shared/constants/variables';

const AVAILABLE_LOCALES = {
  [CROSSFI_FOUNDATION_URL]: ['en'],
  [CROSSFI_FINANCE_URL]: [],
  [CROSSFI_SCAN_URL]: ['en'],
  default: [],
};

const addLocale = (link: string, locale: string) => {
  const availableLocales = AVAILABLE_LOCALES[link] || AVAILABLE_LOCALES.default;

  return urlJoin(link, availableLocales.includes(locale) ? locale : '');
};

export default addLocale;
