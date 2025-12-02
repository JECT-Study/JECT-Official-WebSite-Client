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
    async response => {
      const responseData = response.data as ApiResponse<unknown>;

      //TODO: BE에서 response가 200 + G-07로 오는 경우 (API 변경점 확인 후 제거 혹은 이동)
      if (responseData?.status === "G-07") {
        const originalRequest = response.config as ExtendedAxiosRequestConfig;

        if (originalRequest._retry) {
          return response;
        }

        originalRequest._retry = true;

        const refreshResponse = await refreshAccessToken();

        if (refreshResponse.status === "SUCCESS" && refreshResponse.data) {
          return instance(originalRequest);
        }

        throw new Error("토큰 갱신 응답이 올바르지 않습니다.");
      }

      return response;
    },
    error => {
      throw error;
    },
  );

  return instance;
};

export const httpClient = createClient();
