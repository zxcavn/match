import { ReactElement } from 'react';

import { MpxIcon, XfiIcon, XftIcon } from '../icons';
import type { ThemeIcon } from '../icons/types';

type Currency = Readonly<{
  symbol: string;
  text: string;
  Icon: ReactElement | ThemeIcon;
  formatDecimals: number;
}>;

const CURRENCIES: Readonly<Record<'mpx' | 'xfi' | 'xft', Currency>> = {
  xfi: {
    symbol: 'xfi',
    text: 'XFI',
    Icon: XfiIcon,
    formatDecimals: 6,
  },
  mpx: {
    symbol: 'mpx',
    text: 'MPX',
    Icon: MpxIcon,
    formatDecimals: 6,
  },
  xft: {
    symbol: 'xft',
    text: 'XFT',
    Icon: XftIcon,
    formatDecimals: 6,
  },
};

export default CURRENCIES;
