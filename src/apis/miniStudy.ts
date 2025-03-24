import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { MiniStudiesResponseData } from '@/types/apis/miniStudy';
import { requestHandler } from '@/utils/httpClient';

export const getMiniStudies = async () => {
  return await requestHandler<MiniStudiesResponseData>('get', API_ENDPOINT.miniStudy);
};
