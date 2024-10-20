import { useMemo } from 'react';

import { type TokenSymbol, X_APP_API_URL } from '@/shared/constants';

import useApiCall from './useApiCall';

export type TokenData = {
  address: string;
  data: {
    name: string;
    symbol: TokenSymbol;
    decimals: number;
  };
};

const useTokenList = () => {
  const { data, isLoading } = useApiCall<TokenData[]>(`${X_APP_API_URL}/get_tokens_data`);

  return useMemo(() => ({ data: data || [], isLoading }), [data, isLoading]);
};

export default useTokenList;
