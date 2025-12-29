import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { SemestersResponse } from "@/types/apis/semester";
import { httpClient } from "@/utils/httpClient";

export const getSemesters = async () => {
  return httpClient.get<SemestersResponse>(API_ENDPOINT.semesters);
};
