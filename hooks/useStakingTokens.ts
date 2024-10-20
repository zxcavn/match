import { useMemo } from 'react';

import { Erc20, Staking, StakingXusdUsdt } from '@/abis/types';
import {
  E_MPX_STAKING_ADDRESS,
  LP_MPX,
  LP_USD,
  LP_USDT,
  LP_XFI,
  TokenSymbol,
  XUSD_STAKING_ADDRESS,
} from '@/shared/constants';

import stakingAbi from '../abis/xapp/Staking.json';
import stakingXusdUsdtAbi from '../abis/xapp/staking-xusd-usdt.json';
import { useContract } from './useContract';
import useErc20Contract from './useErc20Contract';

export type StakingToken =
  | { address: string; contract: Erc20 | null; stakingContract: Staking | null; symbol: TokenSymbol }
  | { address: string; symbol: TokenSymbol; contract: Erc20 | null; stakingContract: StakingXusdUsdt | null };

const useStakingTokens = (): StakingToken[] => {
  const mpxAddress = LP_MPX;
  const xusdUsdtAddress = LP_USDT;
  const wethXusdAddress = LP_XFI;

  const wethXusdC = useErc20Contract(LP_XFI);
  const xUsdUsdtC = useErc20Contract(LP_USD);
  const mpxC = useContract<Erc20>(LP_MPX, stakingXusdUsdtAbi);

  const mpxStakingC = useContract<Staking>(E_MPX_STAKING_ADDRESS, stakingAbi);
  const wethXusdStakingC = useContract<Staking>(XUSD_STAKING_ADDRESS, stakingAbi);
  const xUsdUsdtcStakingC = useContract<StakingXusdUsdt>(LP_USDT, stakingXusdUsdtAbi);

  return useMemo(
    () => [
      {
        address: wethXusdAddress,
        contract: wethXusdC,
        stakingContract: wethXusdStakingC,
        symbol: TokenSymbol.lpXFI,
      },
      {
        address: xusdUsdtAddress,
        //TODO: check - in reference lpUSD
        symbol: TokenSymbol.lpUsd as TokenSymbol,
        contract: xUsdUsdtC,
        stakingContract: xUsdUsdtcStakingC,
      },
      {
        address: mpxAddress,
        symbol: TokenSymbol.lpMPX,
        contract: mpxC,
        stakingContract: mpxStakingC,
      },
    ],
    [
      mpxAddress,
      xusdUsdtAddress,
      wethXusdAddress,
      wethXusdC,
      xUsdUsdtC,
      mpxC,
      mpxStakingC,
      wethXusdStakingC,
      xUsdUsdtcStakingC,
    ]
  );
};

export default useStakingTokens;
