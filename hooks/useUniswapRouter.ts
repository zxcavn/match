import type { UniswapV2Router } from '@/abis/types';
import UNISWAP_ROUTER_ABI from '@/abis/uniswap/uniswap-v2-router.json';
import { UNISWAP_ROUTER_CONTRACT_ADDRESS } from '@/shared/constants';

import { useContract } from './useContract';

const useUniswapRouter = () => {
  return useContract<UniswapV2Router>(UNISWAP_ROUTER_CONTRACT_ADDRESS, UNISWAP_ROUTER_ABI);
};

export default useUniswapRouter;
