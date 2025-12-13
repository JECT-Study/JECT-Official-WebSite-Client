import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { refreshAccessToken } from "@/apis/auth";
import { API_BASE_URL } from "@/constants/env";
import type { ApiResponse } from "@/types/apis/response";

const DEFAULT_TIMEOUT = 30000;

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;

      //TODO: 401 체크가 필요한지 검토 (GLOBAL-6는 항상 401에서만 발생하는지 확인)
      if (error.response?.status === 401) {
        const responseData = error.response.data as ApiResponse<unknown>;

        if (responseData?.status === "GLOBAL-6") {
          if (originalRequest._retry) {
            throw error;
          }

          originalRequest._retry = true;

          const refreshResponse = await refreshAccessToken();

          if (refreshResponse.status === "SUCCESS" && refreshResponse.data) {
            return instance(originalRequest);
          }

          throw new Error("토큰 갱신 응답이 올바르지 않습니다.");
        }
      }

      throw error;
    },
  );

  return instance;
};

export const httpClient = createClient();
