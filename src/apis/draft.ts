import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { AnswersRequest, AnswersResponse } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';

interface PostDraftProps {
  param: JobFamily | null;
  answers: AnswersRequest;
}

export const postDraft = async ({ param, answers }: PostDraftProps) => {
  if (!param) return;

  return await requestHandler<null, AnswersRequest>(
    'post',
    `${API_ENDPOINT.draft}?jobFamily=${param}`,
    answers,
  );
};

export const getDraft = async () => {
  return await requestHandler<AnswersResponse>('get', API_ENDPOINT.draft);
};
