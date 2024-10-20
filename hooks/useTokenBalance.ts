import useActiveWeb3React from './useActiveWeb3React';
import useBalance from './useBalance';
import useErc20Contract from './useErc20Contract';

const useTokenBalance = (token?: string) => {
  const contract = useErc20Contract(token);

  const { account } = useActiveWeb3React();

  return useBalance(contract, account);
};

export default useTokenBalance;
