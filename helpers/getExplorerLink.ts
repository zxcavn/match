import urlJoin from 'url-join';

import { CHAIN_INFO, isSupportedChain } from '@/shared/constants';

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data?: string, type?: ExplorerDataType): string | undefined {
  if (isSupportedChain(chainId)) return undefined;

  const url = CHAIN_INFO[chainId].explorer;

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return urlJoin(url, 'tx', data ?? '');

    case ExplorerDataType.TOKEN:
      return urlJoin(url, 'token', data ?? '');

    case ExplorerDataType.BLOCK:
      return urlJoin(url, 'block', data ?? '');

    case ExplorerDataType.ADDRESS:
      return urlJoin(url, 'address', data ?? '');

    default:
      return url;
  }
}