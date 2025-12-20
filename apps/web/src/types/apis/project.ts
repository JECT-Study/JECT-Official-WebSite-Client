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

export type ProjectCategory = "MAIN" | "HACKATHON";
export type ProjectSort = "empty" | "unsorted" | "sorted";

export interface Project {
  id: number;
  name: string;
  summary: string;
  description: string;
  thumbnailUrl: string | null;
}

export interface ProjectListResponse {
  content: Project[];
  number: number;
  size: number;
  totalElements: number;
  last: boolean;
  totalPages: number;
  numberOfElements: number;
  hasNext: boolean;
}

export interface ProjectListQueryParams {
  semesterId?: number;
  category: ProjectCategory;
  page: number;
  size: number;
  sort: ProjectSort;
}

export interface ProjectDetailResponse {
  thumbnailUrl: string;
  name: string;
  startDate: string;
  endDate: string;
  teamMemberNames: {
    productManagers: string[];
    productDesigners: string[];
    frontendDevelopers: string[];
    backendDevelopers: string[];
  };
  techStack: string[];
  description: string;
  serviceUrl: string;
  serviceIntros: {
    imageUrl: string;
    sequence: number;
  }[];
  devIntros: {
    imageUrl: string;
    sequence: number;
  }[];
}
