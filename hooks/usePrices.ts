import { useMemo } from 'react';

import { PRICES_API } from '@/shared/constants';

import useApiCall from './useApiCall';

type CurrencyData = {
  docs: Array<{ symbol: string; rate: number }>;
};

const PRICES_LIMIT = 160;

const usePrices = () => {
  const { data } = useApiCall<CurrencyData>(`${PRICES_API}?limit=${PRICES_LIMIT}`);

  return useMemo(() => {
    if (!data || !data.docs) return;

    const newPrices: Record<string, number> = {};

    data.docs.forEach((item: any) => {
      newPrices[item.symbol] = 1 / item.rate;
    });

    return newPrices;
  }, [data]);
};

export default usePrices;
