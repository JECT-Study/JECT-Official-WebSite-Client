import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { Answers } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';
import { requestHandler } from '@/utils/httpClient';

interface PostDraftProps {
  param: JobFamily;
  answers: Answers;
}

export const postDraft = async ({ param, answers }: PostDraftProps) => {
  return await requestHandler<null, Answers>(
    'post',
    `${API_ENDPOINT.draft}?jobFamily=${param}`,
    answers,
  );
};
