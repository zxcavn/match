import erc20Abi from '@/abis/erc20.json';
import type { Erc20 } from '@/abis/types';

import { useContract } from './useContract';

const useErc20Contract = (token?: string) => {
  return useContract<Erc20>(token, erc20Abi);
};

export default useErc20Contract;
