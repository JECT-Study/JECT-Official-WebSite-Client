import axios from "axios";

import { API_ENDPOINT } from "@/constants/apiEndpoint";
import { API_BASE_URL } from "@/constants/env";
import type { RefreshTokenResponse } from "@/types/apis/auth";
import type { ApiResponse } from "@/types/apis/response";

export const refreshAccessToken = async (): Promise<ApiResponse<RefreshTokenResponse>> => {
  return await axios
    .post<ApiResponse<RefreshTokenResponse>>(`${API_BASE_URL}${API_ENDPOINT.refreshToken}`, null, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.data);
};
