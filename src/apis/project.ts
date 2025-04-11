import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  ProjectDetailResponse,
  ProjectListQueryParams,
  ProjectListResponse,
  ProjectReviewsQueryParams,
  ProjectReviewsResponse,
} from '@/types/apis/project';
import { requestHandler } from '@/utils/httpClient';

export const getProjectReviews = async ({ page, size }: ProjectReviewsQueryParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const url = `${API_ENDPOINT.projectReview}?${params.toString()}`;
  return await requestHandler<ProjectReviewsResponse>('get', url);
};

export const getProjectList = async ({
  semesterId,
  category,
  page,
  size,
}: ProjectListQueryParams) => {
  const params = new URLSearchParams({
    semesterId: semesterId.toString(),
    category: category,
    page: page.toString(),
    size: size.toString(),
  });

  const url = `${API_ENDPOINT.projectList}?${params.toString()}`;
  return await requestHandler<ProjectListResponse>('get', url);
};

export const getProjectDetail = async (projectId: string) => {
  const url = `${API_ENDPOINT.projectDetail.replace(':projectId', projectId)}`;
  return await requestHandler<ProjectDetailResponse>('get', url);
};
