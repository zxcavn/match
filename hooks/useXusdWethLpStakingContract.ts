import { Staking } from '@/abis/types';
import { XUSD_STAKING_ADDRESS } from '@/shared/constants';

import stakingAbi from '../abis/xapp/Staking.json';
import { useContract } from './useContract';

const useXusdWethLpStakingContract = () => {
  return useContract<Staking>(XUSD_STAKING_ADDRESS, stakingAbi);
};

export default useXusdWethLpStakingContract;
