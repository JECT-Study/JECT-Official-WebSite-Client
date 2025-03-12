import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { MiniStudies } from '@/types/apis/miniStudy';
import { requestHandler } from '@/utils/httpClient';

export const getMiniStudies = async () => {
  return await requestHandler<MiniStudies>('get', API_ENDPOINT.miniStudy);
};
