import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { SemesterResponse } from '@/types/apis/semester';
import { requestHandler } from '@/utils/httpClient';

export const getSemesters = async () => {
  return await requestHandler<SemesterResponse>('get', API_ENDPOINT.semesters);
};
