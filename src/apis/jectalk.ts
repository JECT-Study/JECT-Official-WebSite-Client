import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { Jectalks } from '@/types/apis/jectalk';
import { ApiResponse } from '@/types/apis/response';
import { requestHandler } from '@/utils/httpClient';

export const getJectalks = async () => {
  return await requestHandler<ApiResponse<Jectalks>>('get', API_ENDPOINT.jectalk);
};
