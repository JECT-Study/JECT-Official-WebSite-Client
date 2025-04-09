import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { ProjectReviewsQueryParams, ProjectReviewsResponse } from '@/types/apis/project';
import { requestHandler } from '@/utils/httpClient';

export const getProjectReviews = async ({ page, size }: ProjectReviewsQueryParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const url = `${API_ENDPOINT.projectReview}?${params.toString()}`;
  return await requestHandler<ProjectReviewsResponse>('get', url);
};
