import { useMemo } from 'react';

import { TokenSymbol, WXFI_CONTRACT_ADDRESS, X_APP_API_URL } from '@/shared/constants';

import useApiCall from './useApiCall';

interface IPathResponse {
  Path: string[];
  Error?: string;
}

const useGetSwapPath = (
  token0?: string,
  token1?: string,
  amountIn = '1'
): {
  result?: IPathResponse | null;
  isLoading: boolean;
} => {
  const url = useMemo(() => {
    const targetIn = token0 === TokenSymbol.xfi ? WXFI_CONTRACT_ADDRESS : token0;
    const targetOut = token1 === TokenSymbol.xfi ? WXFI_CONTRACT_ADDRESS : token1;

    return `${X_APP_API_URL}/get_path?token0=${targetIn}&token1=${targetOut}&amount_in=${amountIn?.toString()}`;
  }, [token0, token1, amountIn]);

  const { data, isLoading } = useApiCall<IPathResponse>(url);

  return {
    result: data,
    isLoading,
  };
};

export default useGetSwapPath;
