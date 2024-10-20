import type { Contract } from '@ethersproject/contracts';

import ERC20_BYTES32_ABI from '@/abis/erc20_bytes32.json';

import { useContract } from './useContract';

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
