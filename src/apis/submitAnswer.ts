import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { AnswersRequest } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';

interface PostSubmitAnswerProps {
  param: JobFamily | null;
  answers: AnswersRequest;
}

export const postSubmitAnswer = async ({ param, answers }: PostSubmitAnswerProps) => {
  if (!param) return;

  return await requestHandler<null, AnswersRequest>(
    'post',
    `${API_ENDPOINT.submitAnswer}?jobFamily=${param}`,
    answers,
  );
};
