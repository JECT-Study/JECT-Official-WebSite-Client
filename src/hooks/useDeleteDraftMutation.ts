import { useMutation } from '@tanstack/react-query';

import { deleteDraft } from '@/apis/draft';
import { removeDraftLocal } from '@/utils/draftUtils';

const useDeleteDraftMutation = () => {
  return useMutation({
    mutationKey: ['deleteDraft'],
    mutationFn: deleteDraft,
    onError: error => console.error(`Query Error : ${error}`),
    onSuccess: () => removeDraftLocal(),
  });
};

export default useDeleteDraftMutation;
