import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { JectalksResponse } from "@/types/apis/jectalk";
import type { ApiResponse } from "@/types/apis/response";
import { httpClient } from "@/utils/httpClient";

export const getJectalks = async (semesterName?: string | null) => {
  const params = new URLSearchParams();
  params.append("size", "100");

  if (semesterName) {
    params.append("sort", semesterName);
  }

  const url = `${API_ENDPOINT.jectalk}?${params.toString()}`;
  return httpClient.get<ApiResponse<JectalksResponse>>(url);
};
