import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { JectalksResponseData } from '@/types/apis/jectalk';
import { requestHandler } from '@/utils/httpClient';

export const getJectalks = async () => {
  return await requestHandler<JectalksResponseData>('get', API_ENDPOINT.jectalk);
};
