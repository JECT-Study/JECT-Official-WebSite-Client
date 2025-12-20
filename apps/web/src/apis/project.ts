import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type {
  ProjectDetailResponse,
  ProjectListQueryParams,
  ProjectListResponse,
  ProjectReviewsQueryParams,
  ProjectReviewsResponse,
} from "@/types/apis/project";
import type { ApiResponse } from "@/types/apis/response";
import { httpClient, requestHandler } from "@/utils/httpClient";

export const getProjectReviews = async ({ page, size }: ProjectReviewsQueryParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const url = `${API_ENDPOINT.projectReview}?${params.toString()}`;
  return await requestHandler<ProjectReviewsResponse>("get", url);
};

export const getProjectList = async ({
  semesterId,
  category,
  page,
  size,
  sort,
}: ProjectListQueryParams) => {
  const params = new URLSearchParams();

  if (semesterId !== undefined) {
    params.append("semesterId", semesterId.toString());
  }

  params.append("category", category);
  params.append("page", page.toString());
  params.append("size", size.toString());
  params.append("sort", sort.toString());

  const url = `${API_ENDPOINT.projectList}?${params.toString()}`;
  return await httpClient.get<ApiResponse<ProjectListResponse>>(url);
};

export const getProjectDetail = async (projectId: string) => {
  const url = `${API_ENDPOINT.projectDetail.replace(":projectId", projectId)}`;

  return await requestHandler<ProjectDetailResponse>("get", url);
};
