import { Contract } from '@ethersproject/contracts';
import type { ListenerOptionsWithGas } from '@uniswap/redux-multicall';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';

import { ZERO } from '@/shared/constants';
import { useSingleCallResult } from '@/store/multicall/hooks';

const useBalance = (
  contract: Contract | null,
  address: string | null | undefined,
  options?: ListenerOptionsWithGas
): BigNumber => {
  const deps = useMemo(() => [address || undefined], [address]);

  return useSingleCallResult(contract, 'balanceOf', deps, options)?.result?.[0] || ZERO;
};

export default useBalance;
