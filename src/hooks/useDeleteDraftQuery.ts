import { useMutation } from '@tanstack/react-query';

import { deleteDraft } from '@/apis/draft';

const useDeleteDraftQuery = () => {
  const { mutate: deleteDraftMutate } = useMutation({
    mutationKey: ['deleteDraft'],
    mutationFn: deleteDraft,
    onError: error => console.error(`Query Error : ${error}`),
  });

  return { deleteDraftMutate };
};

export default useDeleteDraftQuery;
