import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getProjectList } from "@/apis/project";
import type { ProjectCategory, ProjectListResponse } from "@/types/apis/project";

export const useProjectListQuery = (category: ProjectCategory) => {
  return useInfiniteQuery<
    ProjectListResponse,
    AxiosError,
    InfiniteData<ProjectListResponse, number>,
    readonly [string, ProjectCategory],
    number
  >({
    queryKey: ["getProjectList", category],
    queryFn: async ({ pageParam }): Promise<ProjectListResponse> => {
      return await getProjectList({
        category,
        page: pageParam,
        size: 6,
        sort: "sorted",
      });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.hasNext) {
        return lastPage.number + 1;
      }
      return undefined;
    },
    staleTime: 0,
    gcTime: 0,
  });
};
