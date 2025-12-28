import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { MiniStudiesResponse } from "@/types/apis/miniStudy";
import type { ApiResponse } from "@/types/apis/response";
import { httpClient } from "@/utils/httpClient";

export type PositionFilter = "PM" | "PD" | null;

export const getMiniStudies = async (position?: PositionFilter) => {
  const params = new URLSearchParams();
  params.append("size", "100");

  if (position) {
    params.append("sort", position);
  }

  const url = `${API_ENDPOINT.miniStudy}?${params.toString()}`;
  return httpClient.get<ApiResponse<MiniStudiesResponse>>(url);
};
