import type { z } from "zod";

import type { ApiResponse } from "@/types/apis/response";
import { httpClient as axiosInstance } from "@/utils/interceptor";

function validate<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
}

async function request<T extends z.ZodType>(
  url: string,
  method: "get" | "post" | "put" | "delete",
  schema: T,
  data?: unknown,
): Promise<z.infer<T>> {
  const response = await axiosInstance({ url, method, data });

  return validate(schema, response.data);
}

export const httpClient = {
  get: <T extends z.ZodType>(url: string, schema: T) => request(url, "get", schema),

  post: <T extends z.ZodType>(url: string, schema: T, data?: unknown) =>
    request(url, "post", schema, data),

  put: <T extends z.ZodType>(url: string, schema: T, data?: unknown) =>
    request(url, "put", schema, data),

  delete: <T extends z.ZodType>(url: string, schema: T) => request(url, "delete", schema),
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
