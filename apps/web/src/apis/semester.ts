import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { SemestersResponse } from "@/types/apis/semester";
import { requestHandler } from "@/utils/httpClient";

export const getSemesters = async () => {
  return await requestHandler<SemestersResponse>("get", API_ENDPOINT.semesters);
};
