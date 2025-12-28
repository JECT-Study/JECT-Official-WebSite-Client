import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { MiniStudiesResponse } from "@/types/apis/miniStudy";
import { httpClient } from "@/utils/httpClient";

export const getMiniStudies = async () => {
  const url = `${API_ENDPOINT.miniStudy}?size=100`;
  return httpClient.get<MiniStudiesResponse>(url);
};
