import { useMutation } from '@tanstack/react-query';

import { postDraft } from '@/apis/draft';

const useSaveDraftMutation = () => {
  return useMutation({
    mutationKey: ['saveDraft'],
    mutationFn: postDraft,
    onError: error => console.error(`Query Error : ${error}`),
  });
};

export default useSaveDraftMutation;
