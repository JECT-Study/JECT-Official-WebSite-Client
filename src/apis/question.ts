import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { JobFamily, QuestionResponse } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';

export const getQuestions = async (param: JobFamily | null) => {
  if (!param) return;

  return await requestHandler<QuestionResponse>(
    'get',
    `${API_ENDPOINT.question}?jobFamily=${param}`,
  );
};
