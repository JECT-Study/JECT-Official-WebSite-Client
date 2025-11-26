import type { Sort } from "./sort";

export interface Jectalk {
  id: number;
  name: string;
  youtubeUrl: string;
  imageUrl: string;
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
