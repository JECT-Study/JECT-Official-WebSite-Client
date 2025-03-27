import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { JobFamily } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';
// jobFamilyRequest라고 해야할지..? 이미 jobFamily를 정의해준게 있는데

export const putJob = async (job: JobFamily) => {
  return await requestHandler<null, JobFamily>('put', API_ENDPOINT.changeJob, job);
};
