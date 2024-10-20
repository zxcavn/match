import { XfiIcon, XftIcon } from '@/lib/xfi.lib/icons';
import { LP_MPX, LP_USD, LP_XFI } from '@/shared/constants/variables';

export enum TokenSymbol {
  lpXFI = 'lpXFI',
  lpUsd = 'lpUsd',
  lpMPX = 'lpMPX',
  esXFI = 'esXFI',
  xfi = 'xfi',
  eth = 'eth',
  weth = 'weth',
  usdt = 'usdt',
  xUsd = 'xusd',
  wxfi = 'wxfi',
}

export const LP_TOKENS = [
  {
    symbol: TokenSymbol.lpXFI,
    icon: XfiIcon,
    label: TokenSymbol.lpXFI,
    currency: TokenSymbol.lpXFI,
    tokenAddress: LP_XFI,
  },
  {
    symbol: TokenSymbol.lpUsd,
    icon: XfiIcon,
    label: TokenSymbol.lpUsd,
    currency: TokenSymbol.lpUsd,
    tokenAddress: LP_USD,
  },
  {
    symbol: TokenSymbol.lpMPX,
    icon: XfiIcon,
    label: TokenSymbol.lpMPX,
    currency: TokenSymbol.lpMPX,
    tokenAddress: LP_MPX,
  },
];

export const getIconBySymbol = (symbol: TokenSymbol) => {
  switch (symbol) {
    case TokenSymbol.esXFI:

    case TokenSymbol.eth:

    case TokenSymbol.weth:

    case TokenSymbol.usdt:

    case TokenSymbol.xUsd:

    case TokenSymbol.wxfi:
      return XftIcon;

    case TokenSymbol.xfi:

    case TokenSymbol.lpXFI:

    case TokenSymbol.lpMPX:

    case TokenSymbol.lpUsd:
      return XfiIcon;

    default:
      return XftIcon;
  }
};
