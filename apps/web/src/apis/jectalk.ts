import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { JectalksResponse } from "@/types/apis/jectalk";
import type { ApiResponse } from "@/types/apis/response";
import { httpClient } from "@/utils/httpClient";

export type SemesterFilter = "1" | "2" | "3" | null;

export const getJectalks = async (semester?: SemesterFilter) => {
  const params = new URLSearchParams();
  params.append("size", "100");

  if (semester) {
    params.append("sort", semester);
  }

  const url = `${API_ENDPOINT.jectalk}?${params.toString()}`;
  return httpClient.get<ApiResponse<JectalksResponse>>(url);
};
