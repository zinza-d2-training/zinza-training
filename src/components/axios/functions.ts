import axios, { AxiosRequestConfig } from 'axios';

export interface CreateAxiosInstanceOptions {
  config?: AxiosRequestConfig;
}

export const createAxiosInstance = (options?: CreateAxiosInstanceOptions) => {
  return axios.create(options?.config);
};
