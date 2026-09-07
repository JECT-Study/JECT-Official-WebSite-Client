import { activeRecruitmentsResponseSchema, type ActiveRecruitmentsResponseSchema } from "./schemas";

import { API_ENDPOINT } from "@/constants/apiEndpoint";
import { httpClient } from "@/utils/httpClient";

export const recruitApi = {
  getActiveRecruitments: () =>
    httpClient.get<ActiveRecruitmentsResponseSchema>(
      API_ENDPOINT.activeRecruits,
      activeRecruitmentsResponseSchema,
    ),
} as const;
