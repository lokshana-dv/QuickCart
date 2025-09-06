import { useEffect, useState } from 'react';
import apiClient from '../utils/api-client';

const useData = (endpoint, customConfig = {}, deps = []) => {
  const [data, setData] = useState(null); // null for single product
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get(endpoint, customConfig)
      .then(res => {
        if (endpoint === "/products" && customConfig?.params?.page !== 1) {
          setData(prev => ({
            ...res.data,
            products: [...(prev?.products || []), ...res.data.products]
          }));
        } else {
          setData(res.data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, JSON.stringify(customConfig), ...deps]);

  return { data, error, isLoading };
};

export default useData;
