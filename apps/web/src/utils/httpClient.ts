import type { z } from "zod";

import type { ApiResponse } from "@/types/apis/response";
import { httpClient as axiosInstance } from "@/utils/interceptor";

function validate<T>(schema: z.ZodType<T>, data: unknown): unknown {
  schema.parse(data);

  return data;
}

async function request<T>(
  url: string,
  method: "get" | "post" | "put" | "delete",
  data?: unknown,
  schema?: z.ZodType<T>,
): Promise<unknown> {
  const response = await axiosInstance({ url, method, data });

  if (schema) {
    validate(schema, response.data);
  }

  return response.data;
}

export const httpClient = {
  get: <T = unknown>(url: string, schema?: z.ZodType<T>) => request(url, "get", undefined, schema),

  post: <T = unknown>(url: string, data?: unknown, schema?: z.ZodType<T>) =>
    request(url, "post", data, schema),

  put: <T = unknown>(url: string, data?: unknown, schema?: z.ZodType<T>) =>
    request(url, "put", data, schema),

  delete: <T = unknown>(url: string, schema?: z.ZodType<T>) =>
    request(url, "delete", undefined, schema),
};

/**
 * 기존에 사용한 요청 핸들러 (신규 구현 시 requestHandler을 사용하는 부분의 제거가 완료되면 이 부분 제거)
 * @deprecated
 */
export const requestHandler = async <TResponse, TPayload = undefined>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  payload?: TPayload,
): Promise<ApiResponse<TResponse>> => {
  const response = await axiosInstance({ url, method, data: payload });
  return response.data;
};
