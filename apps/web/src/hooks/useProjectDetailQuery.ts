import { useQuery } from "@tanstack/react-query";

import { getProjectDetail } from "@/apis/project";
import type { ProjectDetailResponse } from "@/types/apis/project";
import type { ApiResponse } from "@/types/apis/response";

export const useProjectDetailQuery = (projectId: string) => {
  return useQuery<ApiResponse<ProjectDetailResponse>>({
    queryKey: ["getProjectDetail", projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });
};
