import { useMemo } from 'react';

import { ZERO } from '@/shared/constants';

import useCallStaticMethod from './useCallStaticMethod';
import useXusdWethLpStakingContract from './useXusdWethLpStakingContract';

const DEPS: string[] = [];

const useStakingResults = () => {
  const contract = useXusdWethLpStakingContract();

  const { loading, result } = useCallStaticMethod(contract, 'getUserData', DEPS);

  const DEFAULT_REWARDS = [ZERO, ZERO, ZERO, ZERO, ZERO, ZERO];

  const [lpXfiStaked, bonusPoints, vestingEarned, esXfiEarned, balanceVST, wethEarned] = useMemo(() => {
    return !loading && Array.isArray(result) ? result : DEFAULT_REWARDS;
  }, [loading, result]);

  return {
    loading,
    lpXfiStaked,
    bonusPoints,
    vestingEarned,
    esXfiEarned,
    balanceVST,
    wethEarned,
  };
};

export default useStakingResults;
