import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const fetchCall = (url: string) =>
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(response => response.data);

type CallResult<Data> = {
  data: Data | null;
  error: Error | null;
  isLoading: boolean;
};

export const useApiCall = <Data>(key: string, fetcher: any = fetchCall): CallResult<Data> => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null); // Добавляем типизацию ошибки
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetcher(key);

        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key, fetcher]);

  return useMemo(() => {
    return { data, error, isLoading };
  }, [data, error, isLoading]);
};

export default useApiCall;
