import { useQuery } from "@tanstack/react-query";

import { getSemesters } from "@/apis/semester";
import type { ApiResponse } from "@/types/apis/response";
import type { SemestersResponse } from "@/types/apis/semester";

export const useSemestersQuery = () => {
  return useQuery<ApiResponse<SemestersResponse>>({
    queryKey: ["getSemesters"],
    queryFn: getSemesters,
  });
};
