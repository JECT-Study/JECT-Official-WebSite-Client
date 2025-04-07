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

export const isLocalEnvironment = import.meta.env.DEV;
export const isLocalStorageEnabled = import.meta.env.VITE_USE_LOCAL_STORAGE === 'true';

export const tokenUtils = {
  getAccessToken: (): string | null => {
    return isLocalStorageEnabled ? localStorage.getItem('accessToken') : null;
  },
  getRefreshToken: (): string | null => {
    return isLocalStorageEnabled ? localStorage.getItem('refreshToken') : null;
  },
  setAccessToken: (accessToken: string): void => {
    if (isLocalStorageEnabled) {
      localStorage.setItem('accessToken', accessToken);
    }
  },
  setRefreshToken: (refreshToken: string): void => {
    if (isLocalStorageEnabled) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  },
  removeTokens: (): void => {
    if (isLocalStorageEnabled) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
};

export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: !isLocalEnvironment,
    ...config,
  });

  instance.interceptors.request.use(
    config => {
      if (isLocalStorageEnabled && isLocalEnvironment) {
        const accessToken = tokenUtils.getAccessToken();
        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    },
  );

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (isLocalStorageEnabled) {
        const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = tokenUtils.getRefreshToken();

            if (!refreshToken) {
              tokenUtils.removeTokens();
              return Promise.reject(error);
            }

            const response = await refreshAccessToken({ refreshToken });

            if (response.status === 'SUCCESS' && response.data) {
              const { accessToken } = response.data;

              tokenUtils.setAccessToken(accessToken);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }

              return instance(originalRequest);
            }
          } catch (refreshError) {
            console.error('토큰 갱신 실패:', refreshError);
            tokenUtils.removeTokens();
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const httpClient = createClient();
