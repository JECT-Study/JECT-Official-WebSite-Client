import type { Sort } from "./sort";

export interface Jectalk {
  id: number;
  title: string;
  description: string;
  contentUrl: string;
  contentType: string;
  thumbnailUrl: string;
  summary: string;
}

export interface JectalksResponse {
  content: Jectalk[];
  number: number;
  size: number;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
