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

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post<T>(url, payload);
      break;
    case 'get':
      response = await httpClient.get<T>(url);
      break;
    case 'put':
      response = await httpClient.put<T>(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete<T>(url);
      break;
  }

  return response.data;
};
