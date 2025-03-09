import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = '/api';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    ...config,
  });

  return axiosInstance;
};

export const httpClient = createClient();
