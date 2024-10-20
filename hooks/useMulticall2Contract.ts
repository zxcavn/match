import ABI from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json';

import { MULTICALL_CONTRACT_ADDRESS } from '@/shared/constants';
import type { UniswapInterfaceMulticall } from '@/types/v3';

import { useContract } from './useContract';

function useMulticall2Contract() {
  return useContract<UniswapInterfaceMulticall>(
    MULTICALL_CONTRACT_ADDRESS,
    ABI.abi,
    false
  ) as UniswapInterfaceMulticall;
}

export default useMulticall2Contract;
