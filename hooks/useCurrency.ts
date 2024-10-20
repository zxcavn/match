import { Currency } from '@uniswap/sdk-core';
import { useMemo } from 'react';

import useActiveWeb3React from './useActiveWeb3React';
import useToken, { ExtendedEther, WETH9_EXTENDED } from './useToken';

function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const { chainId } = useActiveWeb3React();
  const isETH = currencyId?.toUpperCase() === 'ETH' || currencyId?.toUpperCase() === 'XFI';
  const token = useToken(isETH ? undefined : currencyId);
  const extendedEther = useMemo(() => (chainId ? ExtendedEther.onChain(chainId) : undefined), [chainId]);

  return useMemo(() => {
    const weth = chainId ? WETH9_EXTENDED[chainId] : undefined;

    if (weth?.address?.toLowerCase() === currencyId?.toLowerCase()) return weth;
    return isETH ? extendedEther : token;
  }, [chainId, isETH, extendedEther, token, currencyId]);
}

export default useCurrency;
