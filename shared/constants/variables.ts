export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || '';
export const APP_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || '';
export const X_APP_API_URL = process.env.NEXT_PUBLIC_X_APP_API_URL || '';

export const IS_PRODUCTION = APP_ENV === 'production';
export const IS_DEVELOPMENT = APP_ENV === 'development';
export const IS_STAGING = APP_ENV === 'staging';

export const PRICES_API = process.env.NEXT_PUBLIC_PRICES_API || '';

export const PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || '';
export const CROSSFI_SCAN_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSSFI_SCAN || '';
export const CROSSFI_CONSOLE_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSSFI_CONSOLE || '';
export const CROSSFI_BRIDGE_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSSFI_BRIDGE || '';
export const CROSSFI_GET_MPX_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSSFI_GET_MPX || '';
export const CROSSFI_FINANCE_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSSFI_FINANCE || '';
export const CROSSFI_FOUNDATION_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSSFI_FOUNDATION || '';

export const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY || '';
export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const CROSSFI_EVM_RPC_URL = process.env.NEXT_PUBLIC_CROSSFI_EVM_RPC_URL || '';
export const CROSSFI_EVM_RPC_FALLBACK_URL = process.env.NEXT_PUBLIC_CROSSFI_EVM_RPC_FALLBACK_URL || '';

export const LP_XFI = process.env.NEXT_PUBLIC_LP_XFI || '';
export const LP_USD = process.env.NEXT_PUBLIC_LP_USD || '';
export const LP_MPX = process.env.NEXT_PUBLIC_LP_MPX || '';
export const LP_USDT = process.env.NEXT_PUBLIC_LP_USDT || '';

export const XUSD_STAKING_ADDRESS = process.env.NEXT_PUBLIC_XUSD_STAKING_ADDRESS || '';
export const E_MPX_STAKING_ADDRESS = process.env.NEXT_PUBLIC_E_MPX_STAKING_ADDRESS || '';

export const MULTICALL_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS || '';
export const UNISWAP_ROUTER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_UNISWAP_ROUTER_CONTRACT_ADDRESS || '';
export const WXFI_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WXFI_CONTRACT_ADDRESS || '';
