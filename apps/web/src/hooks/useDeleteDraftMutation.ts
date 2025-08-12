import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteDraft } from '@/apis/application';
import { ApiResponse } from '@/types/apis/response';
import { removeDraftLocal } from '@/utils/draftUtils';

const useDeleteDraftMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  null,
  unknown
> => {
  return useMutation({
    mutationKey: ['deleteDraft'],
    mutationFn: deleteDraft,
    onSuccess: () => removeDraftLocal(),
  });
};

export default useDeleteDraftMutation;
