import type { Wxfi } from '@/abis/types';
import WXFI_ABI from '@/abis/xapp/wxfi.json';
import { WXFI_CONTRACT_ADDRESS } from '@/shared/constants';

import { useContract } from './useContract';

const useWXfiContract = () => {
  return useContract<Wxfi>(WXFI_CONTRACT_ADDRESS, WXFI_ABI);
};

export default useWXfiContract;
