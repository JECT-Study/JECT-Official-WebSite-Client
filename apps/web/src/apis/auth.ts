import axios from "axios";

import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { RefreshTokenResponse } from "@/types/apis/auth";
import type { ApiResponse } from "@/types/apis/response";

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

export const refreshAccessToken = async (): Promise<ApiResponse<RefreshTokenResponse>> => {
  return await axios
    .post<ApiResponse<RefreshTokenResponse>>(`${BASE_URL}${API_ENDPOINT.refreshToken}`, null, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.data);
};
