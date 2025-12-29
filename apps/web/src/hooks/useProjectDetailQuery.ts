import { useQuery } from "@tanstack/react-query";

import { getProjectDetail } from "@/apis/project";
import type { ProjectDetailResponse } from "@/types/apis/project";

export const useProjectDetailQuery = (projectId: string) => {
  return useQuery<ProjectDetailResponse>({
    queryKey: ["getProjectDetail", projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });
};
