import { useQuery } from "@tanstack/react-query";

import { getSemesters } from "@/apis/semester";
import type { SemestersResponse } from "@/types/apis/semester";

export const useSemestersQuery = () => {
  return useQuery<SemestersResponse>({
    queryKey: ["getSemesters"],
    queryFn: getSemesters,
  });
};
