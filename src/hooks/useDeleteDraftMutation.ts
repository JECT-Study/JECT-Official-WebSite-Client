import { useMutation } from '@tanstack/react-query';

import { deleteDraft } from '@/apis/draft';

const useDeleteDraftMutation = () => {
  return useMutation({
    mutationKey: ['deleteDraft'],
    mutationFn: deleteDraft,
    onError: error => console.error(`Query Error : ${error}`),
  });
};

export default useDeleteDraftMutation;
