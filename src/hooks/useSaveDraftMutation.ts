import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postDraft } from '@/apis/application';
import { AnswersPayload, JobFamily } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

interface SaveDraftMutationVariables {
  jobFamily: JobFamily;
  answers: AnswersPayload;
}

const useSaveDraftMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  SaveDraftMutationVariables,
  unknown
> => {
  return useMutation({
    mutationKey: ['saveDraft'],
    mutationFn: ({ jobFamily, answers }) => postDraft(jobFamily, answers),
  });
};

export default useSaveDraftMutation;
