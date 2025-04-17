import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import { refreshAccessToken } from '@/apis/auth';

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_PROD;

const DEFAULT_TIMEOUT = 30000;

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;
      //TODO: API RESPONSE TYPE으로 제어 필요
      const responseData = error.response?.data as { status?: string } | undefined;
      const isTokenExpired = responseData?.status === 'G-07';

      if (isTokenExpired && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await refreshAccessToken();

          if (response.status === 'SUCCESS' && response.data) {
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const httpClient = createClient();
