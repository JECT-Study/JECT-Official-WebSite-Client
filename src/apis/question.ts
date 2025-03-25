import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { JobFamily, Question } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';

export const getQuestions = async (param: JobFamily | null) => {
  if (!param) return;

  return await requestHandler<Question[]>('get', `${API_ENDPOINT.question}?jobFamily=${param}`);
};
