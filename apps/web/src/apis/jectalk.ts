import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { JectalksResponse } from "@/types/apis/jectalk";
import { requestHandler } from "@/utils/httpClient";

export const getJectalks = async () => {
  return await requestHandler<JectalksResponse>("get", API_ENDPOINT.jectalk);
};
