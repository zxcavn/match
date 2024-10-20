import { createMulticall, ListenerOptions } from '@uniswap/redux-multicall';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

import useBlockNumber from '@/hocs/BlockNumberProvider';
import useInterfaceMulticall from '@/hooks/useInterfaceMulticall';

/**
 *
 *  The approximate whole number of blocks written to the corresponding chainId per Ethereum mainnet epoch.
 */
const BLOCKS_PER_BLOCKS_PER_FETCH_FETCH = 5;

const multicall = createMulticall();

export function MulticallUpdater() {
  const { chainId } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const contract = useInterfaceMulticall();
  const listenerOptions: ListenerOptions = useMemo(
    () => ({
      blocksPerFetch: BLOCKS_PER_BLOCKS_PER_FETCH_FETCH,
    }),
    [chainId]
  );

  return (
    <>
      <multicall.Updater
        chainId={chainId}
        latestBlockNumber={latestBlockNumber}
        contract={contract}
        listenerOptions={listenerOptions}
      />
    </>
  );
}

export default multicall;
