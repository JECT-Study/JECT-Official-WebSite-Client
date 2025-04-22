import { useInfiniteQuery } from '@tanstack/react-query';

import { getProjectList } from '@/apis/project';
import { ProjectCategory } from '@/types/apis/project';

export const useProjectListQuery = (semesterId: number | null, category: ProjectCategory) => {
  return useInfiniteQuery({
    queryKey: ['getProjectList', semesterId, category],
    queryFn: ({ pageParam = 0 }) => {
      const size = pageParam === 0 ? 6 : 12;

      return getProjectList({
        ...(semesterId !== null && { semesterId }),
        category,
        page: pageParam,
        size,
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
