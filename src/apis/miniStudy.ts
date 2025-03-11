import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { MiniStudies } from '@/types/apis/miniStudy';
import { ApiResponse } from '@/types/apis/response';
import { requestHandler } from '@/utils/httpClient';

export const getMiniStudies = async () => {
  return await requestHandler<ApiResponse<MiniStudies>>('get', API_ENDPOINT.miniStudy);
};
