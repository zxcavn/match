import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import ERC20_ABI from '@/abis/erc20.json';
import ERC721_ABI from '@/abis/erc721.json';
import { Erc20, Erc721 } from '@/abis/types';
import { getContract } from '@/helpers';

import useActiveWeb3React from './useActiveWeb3React';

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;

    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];

    if (!address) return null;

    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('useContract: failed to get contract', error);

      return null;
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T;
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useErc721Contract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc721>(tokenAddress, ERC721_ABI, withSignerIfPossible);
}
