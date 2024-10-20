import UniswapInterfaceMulticallJson from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json';

import { SupportedChainId, MULTICALL_CONTRACT_ADDRESS } from '@/shared/constants';
import { UniswapInterfaceMulticall } from '@/types/v3';

import { useContract } from './useContract';

const { abi: MulticallABI } = UniswapInterfaceMulticallJson;

function useInterfaceMulticall() {
  return useContract<UniswapInterfaceMulticall>(
    { [SupportedChainId.XFI_TESTNET]: MULTICALL_CONTRACT_ADDRESS },
    MulticallABI,
    false
  ) as UniswapInterfaceMulticall;
}

export default useInterfaceMulticall;
