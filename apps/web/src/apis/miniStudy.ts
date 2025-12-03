import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { MiniStudiesResponse } from "@/types/apis/miniStudy";
import { requestHandler } from "@/utils/httpClient";

export const getMiniStudies = async () => {
  return await requestHandler<MiniStudiesResponse>("get", API_ENDPOINT.miniStudy);
};
