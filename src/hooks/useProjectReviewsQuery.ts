import { useQuery } from '@tanstack/react-query';

import { getProjectReviews } from '@/apis/project';
import { ProjectReviewsResponse } from '@/types/apis/project';
import { ApiResponse } from '@/types/apis/response';

export const useProjectReviews = (page: number) => {
  const size = page === 0 ? 4 : 10;

  return useQuery<ApiResponse<ProjectReviewsResponse>>({
    queryKey: ['getProjectReviews', page, size],
    queryFn: () => getProjectReviews({ page, size }),
  });
};
