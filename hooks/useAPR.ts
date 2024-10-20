import { BigNumber } from 'ethers';
import { useMemo } from 'react';

import { BN_1E18, ZERO } from '@/shared/constants';
import { useSingleCallResult } from '@/store/multicall/hooks';

import useXusdWethLpStakingContract from './useXusdWethLpStakingContract';

const SECONDS_IN_YEAR = 31536000;

const useAPR = (rewardRateMethod: string, totalSupplyMethod: string, tokenPrice: number, lpPrice: number) => {
  const contract = useXusdWethLpStakingContract();

  const rewardRate = useSingleCallResult(contract, rewardRateMethod)?.result?.[0] || ZERO;
  const supply = useSingleCallResult(contract, totalSupplyMethod)?.result?.[0] || ZERO;

  const tokenPriceBn = usePriceBnModifier(tokenPrice);
  const lpPriceBn = usePriceBnModifier(lpPrice);

  const apr = useMemo(() => {
    const tokenAllocation: BigNumber = rewardRate.mul(tokenPriceBn).mul(SECONDS_IN_YEAR);
    const lpAllocation: BigNumber = supply.mul(lpPriceBn);

    return lpAllocation.isZero() ? ZERO : tokenAllocation.mul(BN_1E18).mul(100).div(lpAllocation);
  }, [rewardRate, supply, tokenPriceBn, lpPriceBn]);

  return {
    apr,
    loading: apr.isZero(),
  };
};

const PRICE_MULTIPLIER = 100;

const usePriceBnModifier = (price: number) => {
  return useMemo(() => BigNumber.from(Math.floor(price * PRICE_MULTIPLIER)), [price]);
};

export default useAPR;
