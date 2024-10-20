const PAGES = {
  dashboard: { pathname: '/' },
  join: { pathname: '/join' },
  bridge: { pathname: '/bridge' },
  get: { pathname: '/get' },
  swap: { pathname: '/swap' },
  staking: { pathname: '/staking' },
  rewards: { pathname: '/rewards' },
  escrow: { pathname: '/escrow' },
  xusd: { pathname: '/xusd' },
} as const;

export default PAGES;
