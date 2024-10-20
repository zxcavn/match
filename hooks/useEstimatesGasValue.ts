import { NumberFormatter } from '@xfi/formatters';
import { useDebouncedValue } from '@xfi/hooks';
import { BigNumber } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { calculateGasMargin } from '@/helpers';
import { SupportedChainId } from '@/shared/constants';

import useActiveWeb3React from './useActiveWeb3React';

export interface ITxTemplateInfo {
  estimatedGasLimitFunc: (showError?: boolean | undefined) => Promise<BigNumber>;
}

const FEE_DECIMALS = 5;

const useEstimatesGasValue = (info: ITxTemplateInfo) => {
  const { estimatedGasLimitFunc } = info;
  const [estimatedGas, setEstimatedGas] = useState<BigNumber>(BigNumber.from(0));
  const { chainId = SupportedChainId.XFI_TESTNET } = useActiveWeb3React();

  const debouncedFee = useDebouncedValue(estimatedGas);
  const formattedFee = useMemo(
    () => NumberFormatter.formatUnits(debouncedFee.toString(), FEE_DECIMALS),
    [debouncedFee]
  );

  useEffect(() => {
    const getEstimatedGas = async () => {
      const gas = await estimatedGasLimitFunc();

      setEstimatedGas(calculateGasMargin(chainId, gas));
    };

    getEstimatedGas();
  }, [estimatedGasLimitFunc, chainId]);

  return { fee: estimatedGas, formattedFee };
};

export default useEstimatesGasValue;
