import { parseBytes32String } from '@ethersproject/strings';
import { Ether, Token, WETH9 } from '@uniswap/sdk-core';
import { arrayify } from 'ethers/lib/utils';
import { useMemo } from 'react';

import { isAddress } from '@/helpers';
import { SupportedChainId } from '@/shared/constants';
import { NEVER_RELOAD, useSingleCallResult } from '@/store/multicall/hooks';

import useActiveWeb3React from './useActiveWeb3React';
import { useBytes32TokenContract } from './useBytes32TokenContract';
import { useTokenContract } from './useContract';

function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React();

  const address = isAddress(tokenAddress);

  const tokenContract = useTokenContract(address ? address : undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
  const token: Token | undefined = undefined;

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD);
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  );
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD);
  const symbolBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'symbol',
    undefined,
    NEVER_RELOAD
  );
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD);

  return useMemo(() => {
    if (token) return token;

    if (!chainId || !address) return undefined;

    if (decimals.loading || symbol.loading || tokenName.loading) return null;
    // if (decimals.result) {
    return new Token(
      chainId,
      address,
      decimals && decimals.result ? decimals.result[0] : 18,
      parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
      parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
    );
    // }
    // return undefined
  }, [
    address,
    chainId,
    decimals,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ]);
}

// TODO: Delete
export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.ARBITRUM_ONE]: new Token(
    SupportedChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
};

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId];

    throw new Error('Unsupported chain ID');
  }

  private static _cachedEther: { [chainId: number]: ExtendedEther } = {};

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId));
  }
}

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;

  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue;
}

export default useToken;
