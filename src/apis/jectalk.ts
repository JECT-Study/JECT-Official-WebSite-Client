import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { Jectalks } from '@/types/apis/jectalk';
import { requestHandler } from '@/utils/httpClient';

export const getJectalks = async () => {
  return await requestHandler<Jectalks>('get', API_ENDPOINT.jectalk);
};
