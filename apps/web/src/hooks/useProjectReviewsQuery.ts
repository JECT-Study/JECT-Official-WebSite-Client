import { useInfiniteQuery } from "@tanstack/react-query";

import { getProjectReviews } from "@/apis/project";

export const useProjectReviewsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["getProjectReviews"],
    queryFn: ({ pageParam = 0 }) => {
      const size = pageParam === 0 ? 4 : 10;
      return getProjectReviews({
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
