import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import useActiveWeb3React from './useActiveWeb3React';
import useCallStaticMethod from './useCallStaticMethod';

const useEarnedRewards = (contract: Contract | null) => {
  const { account } = useActiveWeb3React();

  const deps = useMemo(() => [account], [account]);

  return useCallStaticMethod(contract, 'earned', deps);
};

export default useEarnedRewards;
