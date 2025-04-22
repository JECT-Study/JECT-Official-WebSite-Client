import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postSubmitAnswer } from '@/apis/application';
import { AnswersPayload, JobFamily } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

interface SubmitAnswerMutationVariable {
  jobFamily: JobFamily;
  answers: AnswersPayload;
}

const useSubmitAnswerMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  SubmitAnswerMutationVariable,
  unknown
> => {
  return useMutation({
    mutationKey: ['submitAnswer'],
    mutationFn: ({ jobFamily, answers }) => postSubmitAnswer(jobFamily, answers),
  });
};

export default useSubmitAnswerMutation;
