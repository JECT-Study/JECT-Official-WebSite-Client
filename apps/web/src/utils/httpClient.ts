import { AxiosError } from 'axios';

import { ExternalAPIError, InternalAPIError, NetworkError } from '@/errors/APIError';
import { ApiResponse } from '@/types/apis/response';
import { httpClient } from '@/utils/interceptor';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export interface RequestOptions {
  headers?: Record<string, string>;
}

export const requestHandler = async <TResponse, TPayload = undefined>(
  method: RequestMethod,
  url: string,
  payload?: TPayload,
  options?: RequestOptions,
): Promise<ApiResponse<TResponse>> => {
  try {
    const requestConfig = {
      headers: {
        ...(options?.headers || {}),
      },
    };

    let response;

    switch (method) {
      case 'post':
        response = await httpClient.post<ApiResponse<TResponse>>(url, payload, requestConfig);
        break;
      case 'get':
        response = await httpClient.get<ApiResponse<TResponse>>(url, requestConfig);
        break;
      case 'put':
        response = await httpClient.put<ApiResponse<TResponse>>(url, payload, requestConfig);
        break;
      case 'delete':
        response = await httpClient.delete<ApiResponse<TResponse>>(url, requestConfig);
        break;
    }

    const status = response.data.status;

    if (status !== 'SUCCESS' && status !== 'TEMP_APPLICATION_NOT_FOUND') {
      const message = (response.data.data as string) || `Internal API 에러 발생, status: ${status}`;
      return Promise.reject(new InternalAPIError(message, status, url));
    }

    return response.data;
  } catch (error) {
    if (error instanceof InternalAPIError) {
      throw error;
    }

    if (error instanceof AxiosError) {
      if (!error.response) {
        throw new NetworkError(error.message, error.code, error.config?.url);
      }

      const { status } = error.response;

      if (status >= 500) {
        throw new ExternalAPIError(error.message, status, url);
      } else if (status >= 400) {
        throw new ExternalAPIError(error.message, status, url);
      }
    }

    throw error;
  }
};
