import { SupportedL1ChainId, SupportedL2ChainId } from '@/shared/constants/chains';
import { CROSSFI_SCAN_URL } from '@/shared/constants/variables';

import { SupportedChainId } from './chainConstants';

enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType;
  readonly docs: string;
  readonly bridge?: string;
  readonly explorer: string;
  //TODO: check if it important
  // readonly logoUrl: string;
  readonly label: string;
  readonly helpCenterUrl?: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
}

interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1;
}

interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2;
  readonly bridge: string;
  readonly statusPage?: string;
  readonly defaultListUrl: string;
}

type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://etherscan.io',
    label: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.XFI_TESTNET]: {
    networkType: NetworkType.L1,
    docs: CROSSFI_SCAN_URL,
    explorer: CROSSFI_SCAN_URL,
    label: 'CrossFi',
    nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
  },
  [SupportedChainId.BNB]: {
    networkType: NetworkType.L1,
    bridge: 'https://cbridge.celer.network/1/56',
    docs: 'https://docs.bnbchain.org/',
    explorer: 'https://bscscan.com',
    label: 'BNB Chain',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    bridge: '#/battles/bridge',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io',
    label: 'Arbitrum',
    defaultListUrl: 'https://bridge.arbitrum.io/token-list-42161.json',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },

  [SupportedChainId.AVALANCHE]: {
    networkType: NetworkType.L1,
    bridge: 'https://core.app/bridge/',
    docs: 'https://docs.avax.network/',
    explorer: 'https://snowtrace.io',
    label: 'Avalanche',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    bridge: 'https://app.optimism.io/bridge',
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io',
    label: 'Optimism',
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    defaultListUrl: 'https://static.optimism.io/optimism.tokenlist.json',
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    bridge: 'https://wallet.polygon.technology/polygon/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com',
    label: 'Polygon',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  },
};
