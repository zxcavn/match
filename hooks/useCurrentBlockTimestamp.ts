import { BigNumber } from 'ethers';

import { useSingleCallResult } from '@/store/multicall/hooks';

import useMulticall2Contract from './useMulticall2Contract';

const useCurrentBlockTimestamp = (): BigNumber | undefined => {
  const multicall = useMulticall2Contract();

  return useSingleCallResult(multicall, 'getCurrentBlockTimestamp')?.result?.[0];
};

export default useCurrentBlockTimestamp;
