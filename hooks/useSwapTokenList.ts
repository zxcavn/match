import { useMemo } from 'react';

import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { TokenSymbol } from '@/shared/constants';

import useTokenList, { type TokenData } from './useTokensList';

// TODO: Refactor type
export type SwapToken = TokenData;

const ALLOWED_ASSETS = ['xusd', 'usdt', 'wxfi', 'xfi', 'empx', 'exe'];
const XFI_API_MODEL: SwapToken = {
  address: TokenSymbol.xfi,
  data: {
    name: CURRENCIES.xfi.text,
    symbol: TokenSymbol.xfi,
    decimals: 18,
  },
};

export const useSwapTokensList = (): {
  data: SwapToken[];
  isLoading: boolean;
} => {
  const { data, isLoading } = useTokenList();

  return useMemo(() => {
    const availableTokenList = data.filter(({ data: { symbol } }) => ALLOWED_ASSETS.includes(symbol.toLowerCase()));

    return {
      data: availableTokenList.length ? [XFI_API_MODEL, ...availableTokenList] : [],
      isLoading,
    };
  }, [data, isLoading]);
};
