import axios from 'axios';

import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { RefreshTokenResponse } from '@/types/apis/auth';
import { ApiResponse } from '@/types/apis/response';

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

export const refreshAccessToken = async (): Promise<ApiResponse<RefreshTokenResponse>> => {
  return await axios
    .post<ApiResponse<RefreshTokenResponse>>(`${BASE_URL}${API_ENDPOINT.refreshToken}`)
    .then(response => response.data);
};
