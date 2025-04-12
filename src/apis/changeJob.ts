import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { ChangeJobRequest } from '@/types/apis/answer';
import { requestHandler } from '@/utils/httpClient';

export const putJob = async (job: ChangeJobRequest) => {
  return await requestHandler<null, ChangeJobRequest>('put', API_ENDPOINT.changeJob, job);
};
