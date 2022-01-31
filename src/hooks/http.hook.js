import { useCallback } from 'react';

const useHttp = () => {
  const request = useCallback(async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  }, []);

  return { request };
};

export default useHttp;
