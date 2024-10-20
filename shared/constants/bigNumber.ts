import { BigNumber } from 'ethers';

export const ZERO = BigNumber.from(0);
export const BN_1E18 = BigNumber.from('1000000000000000000');

export const MAX_DECIMALS_COUNT = 18;

//TODO: review  all places where placed this constant and use token decimals
export const DEFAULT_DECIMALS = 18;
