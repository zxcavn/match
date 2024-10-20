import { NumberFormatter } from '@xfi/formatters';
import { BigNumber } from 'ethers';
import { useEffect, useMemo } from 'react';

import { TokenSymbol, WXFI_CONTRACT_ADDRESS, ZERO } from '@/shared/constants';
import { useSingleCallResult } from '@/store/multicall/hooks';

import useGetSwapPath from './useGetSwapPath';
import { TokenData } from './useTokensList';
import useUniswapRouter from './useUniswapRouter';

const useSwapAmountOut = (amountIn: BigNumber = ZERO, tokenIn?: string, tokenOut?: string) => {
  const contract = useUniswapRouter();
  const { result: path, isLoading: isLoadingPath } = useGetSwapPath(tokenIn, tokenOut);

  const deps = useMemo(() => {
    return [amountIn, path?.Path];
  }, [path, amountIn]);

  const { result, loading: isLoadingContractCall } = useSingleCallResult(contract, 'getAmountsOut', deps);

  return {
    amount: result?.amounts?.[result?.amounts?.length - 1] ?? null, // get last element
    loading: isLoadingPath || isLoadingContractCall,
  };
};

export const useSwapAmountsSync = ({
  amountIn,
  tokenIn,
  tokenOut,
  setAmountOut,
}: {
  // user input value
  amountIn?: string;
  tokenIn?: TokenData;
  tokenOut?: TokenData;
  // amount - formatted value
  setAmountOut: (amount: string) => void;
}) => {
  const isXfiToWxfi = tokenIn?.address === TokenSymbol.xfi && tokenOut?.address === WXFI_CONTRACT_ADDRESS;
  const isWxfiToXfi = tokenIn?.address === WXFI_CONTRACT_ADDRESS && tokenOut?.address === TokenSymbol.xfi;
  const isWrappedSwap = isXfiToWxfi || isWxfiToXfi;

  const amountInDeb = useMemo(() => {
    if (!amountIn || !tokenIn) return;

    return BigNumber.from(NumberFormatter.parseUnits(amountIn, tokenIn.data.decimals));
  }, [amountIn, tokenIn]);

  const { amount: contractAmountOut, loading: isLoadingAmountOut } = useSwapAmountOut(
    amountInDeb,
    tokenIn?.address,
    tokenOut?.address
  );

  // set amount out (amount in triggers)
  useEffect(() => {
    if (isLoadingAmountOut) {
      return;
    }

    if (isWrappedSwap) {
      setAmountOut(amountIn || '');

      return;
    }

    if (contractAmountOut && tokenOut) {
      setAmountOut(NumberFormatter.formatUnits(contractAmountOut, tokenOut.data.decimals));
    }
  }, [contractAmountOut]);

  return {
    isLoading: isLoadingAmountOut,
    isXfiToWxfi,
    isWxfiToXfi,
  };
};
