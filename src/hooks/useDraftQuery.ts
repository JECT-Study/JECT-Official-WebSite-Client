import { useMutation } from '@tanstack/react-query';

import { postDraft } from '@/apis/draft';

const useDraftQuery = () => {
  const { mutate: saveDraftMutate } = useMutation({
    mutationFn: postDraft,
  });

  return { saveDraftMutate };
};

export default useDraftQuery;
