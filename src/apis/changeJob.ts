import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { JobFamily } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';

export const putJob = async (job: JobFamily) => {
  return await requestHandler<null, JobFamily>('put', API_ENDPOINT.changeJob, job);
};
