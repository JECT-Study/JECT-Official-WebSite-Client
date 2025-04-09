export interface ProjectReview {
  id: number;
  linkUrl: string;
  title: string;
  summary: string;
  description: string;
}

export interface ProjectReviewsResponse {
  content: ProjectReview[];
  number: number;
  size: number;
  totalElements: number;
  last: boolean;
  totalPages: number;
  numberOfElements: number;
  hasNext: boolean;
}

export interface ProjectReviewsQueryParams {
  page: number;
  size: number;
}
