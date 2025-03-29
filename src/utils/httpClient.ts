import { AxiosError } from 'axios';

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

    return response.data;
  } catch (error: unknown) {
    console.error(`API Error: ${method.toUpperCase()} ${url}`, error);

    // TODO: throw new Error로 처리 변경 후 처리

    if (error instanceof AxiosError && error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error('인증되지 않았습니다.');
      } else if (status === 403) {
        console.error('권한이 없습니다.');
      } else if (status === 500) {
        console.error('서버 오류가 발생했습니다.');
      }
    } else {
      console.error('네트워크 오류가 발생했습니다.');
    }

    throw error instanceof Error ? error : new Error(String(error));
  }
};
