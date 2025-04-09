import { Sort } from './sort';

export interface MiniStudy {
  id: number;
  name: string;
  linkUrl: string;
  imageUrl: string;
  summary: string;
}

export interface MiniStudiesResponse {
  content: MiniStudy[];
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
