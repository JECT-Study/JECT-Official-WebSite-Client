import { ApiResponse, Sort } from '@/types/response';
import { requestHandler } from '@/utils/httpClient';

interface MiniStudy {
  id: number;
  name: string;
  linkUrl: string;
  imageUrl: string;
  summary: string;
}

interface Temp {
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

export const fetchMiniStudies = async () => {
  return await requestHandler<ApiResponse<Temp>>('get', '/ministudies');
};
