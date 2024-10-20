import { Contract } from 'ethers';
import { useMemo, useState } from 'react';

import useStakingTokens from './useStakingTokens';

const useStakingToken = () => {
  const stakingTokens = useStakingTokens();

  const [tokenIn, setTokenIn] = useState<string>(stakingTokens[0].symbol);

  const tokenInModel = useMemo(
    () => stakingTokens.find(item => item.symbol.toLowerCase() === tokenIn.toLowerCase()),
    [tokenIn, stakingTokens]
  );

  return {
    contract: tokenInModel?.contract as Contract,
    setTokenIn,
    tokenIn: tokenInModel,
    stakingTokens,
    lpStakingContract: tokenInModel?.stakingContract as Contract,
  };
};

export default useStakingToken;
