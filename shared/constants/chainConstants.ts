/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  ARBITRUM_ONE = 42161,
  XFI_TESTNET = 4157,
  BNB = 56,
  OPTIMISM = 10,
  POLYGON = 137,
  AVALANCHE = 43114,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.XFI_TESTNET]: 'crossfi',
  [SupportedChainId.BNB]: 'bnb',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.OPTIMISM]: 'optimism',
  [SupportedChainId.AVALANCHE]: 'avalanche',
} as const;
