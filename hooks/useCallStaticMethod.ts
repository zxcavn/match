import { Contract } from 'ethers';
import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';

import useBlockNumber from '@/hocs/BlockNumberProvider';
import { ZERO } from '@/shared/constants';

import usePrevious from './usePrevious';

const useCallStaticMethod = (contract: Contract | null, method: string, deps: any[], params?: any) => {
  const [val, setValue] = useState(ZERO);
  const [loading, setLoading] = useState(false);

  const blockNumber = useBlockNumber();
  const previous = usePrevious(blockNumber);

  useEffect(() => {
    const fetch = async () => {
      if (!contract) {
        return;
      }

      setLoading(true);
      try {
        const result = params
          ? await contract.callStatic[method](...deps, params)
          : await contract.callStatic[method](...deps);

        setValue(result);
      } catch (e) {
        console.error('useCallStaticMethod', deps, method, e);
      } finally {
        setLoading(false);
      }
    };

    if (contract && !deps.some(i => i === undefined || i === null) && !loading && previous !== blockNumber) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, method, contract, deps]);

  const transitioned = useTransition(val);

  return { result: transitioned, loading: !transitioned && loading };
};

//TODO: search for duplicates after finish restyle project
const useTransition = (data: any) => {
  const [prev, setPrev] = useState(() => data);

  useEffect(() => {
    if (data) {
      setPrev((state: any) => {
        if (state && data && isEqual(data, state)) {
          return state;
        }

        return data;
      });
    }
  }, [data]);

  return prev;
};

export default useCallStaticMethod;
