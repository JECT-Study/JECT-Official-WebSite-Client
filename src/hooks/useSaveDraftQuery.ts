import { useMutation } from '@tanstack/react-query';

import { postDraft } from '@/apis/draft';

const useSaveDraftQuery = () => {
  const { mutate: saveDraftMutate } = useMutation({
    mutationKey: ['saveDraft'],
    mutationFn: postDraft,
    onError: error => console.error(`Query Error : ${error}`),
  });

  return { saveDraftMutate };
};

export default useSaveDraftQuery;
