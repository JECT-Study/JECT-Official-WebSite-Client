import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { JectalksResponse } from "@/types/apis/jectalk";
import { httpClient } from "@/utils/httpClient";

export const getJectalks = async () => {
  const url = `${API_ENDPOINT.jectalk}?size=100`;
  return httpClient.get<JectalksResponse>(url);
};
