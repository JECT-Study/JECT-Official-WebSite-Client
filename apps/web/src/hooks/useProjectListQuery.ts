import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getProjectList } from "@/apis/project";
import type { ProjectCategory, ProjectListResponse } from "@/types/apis/project";
import type { ApiResponse } from "@/types/apis/response";

export const useProjectListQuery = (semesterId: number | null, category: ProjectCategory) => {
  return useInfiniteQuery<
    ApiResponse<ProjectListResponse>,
    AxiosError,
    InfiniteData<ApiResponse<ProjectListResponse>, number>,
    readonly [string, number | null, ProjectCategory],
    number
  >({
    queryKey: ["getProjectList", semesterId, category],
    queryFn: ({ pageParam }) => {
      const size = pageParam === 0 ? 6 : 12;

      return getProjectList({
        ...(semesterId !== null && { semesterId }),
        category,
        page: pageParam,
        size,
        sort: "sorted",
      });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.data.hasNext) {
        return lastPage.data.number + 1;
      }
      return undefined;
    },
  });
};
