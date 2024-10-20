import { BigNumber } from '@ethersproject/bignumber';

// add 20% (except on optimism)
function calculateGasMargin(chainId: number, value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

export default calculateGasMargin;
