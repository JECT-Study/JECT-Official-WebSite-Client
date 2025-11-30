import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { refreshAccessToken } from "@/apis/auth";
import type { ApiResponse } from "@/types/apis/response";

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
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  instance.interceptors.response.use(
    async response => {
      const responseData = response.data as ApiResponse<unknown>;

      if (responseData?.status === "G-07") {
        const originalRequest = response.config as ExtendedAxiosRequestConfig;

        if (!originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshResponse = await refreshAccessToken();

            if (refreshResponse.status === "SUCCESS" && refreshResponse.data) {
              return instance(originalRequest);
            }
          } catch (refreshError) {
            console.error("토큰 갱신 실패:", refreshError);
            return Promise.reject(
              new Error(
                refreshError instanceof Error ? refreshError.message : "토큰 갱신에 실패했습니다.",
              ),
            );
          }
        }
      }
      return response;
    },
    error => {
      if (error instanceof Error) {
        return Promise.reject(error);
      }
      return Promise.reject(new Error("요청 처리 중 오류가 발생했습니다."));
    },
  );

  return instance;
};

export const httpClient = createClient();
