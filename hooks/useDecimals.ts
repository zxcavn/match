import { Contract } from '@ethersproject/contracts';

import { useSingleCallResult } from '@/store/multicall/hooks';

const DEFAULT: string[] = [];
const DEFAULT_DECIMALS = 18;

const useDecimals = (contract: Contract | null): number => {
  const val = useSingleCallResult(contract, 'decimals', DEFAULT)?.result?.[0];

  return val || DEFAULT_DECIMALS;
};

export default useDecimals;
