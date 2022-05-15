import { createAxiosInstance, CreateAxiosInstanceOptions } from 'src/components/axios/functions';
import { useMemo } from 'react';

export const useCreateAxiosInstance = (options?: CreateAxiosInstanceOptions) => {
  return useMemo(() => {
    return createAxiosInstance(options);
  }, [options]);
};
