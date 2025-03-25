import { useMutation, useQuery } from '@tanstack/react-query';

import { getDraft, postDraft } from '@/apis/draft';

const useDraftQuery = () => {
  const { mutate: saveDraftMutate } = useMutation({
    mutationFn: postDraft,
  });

  const { data: draft, isSuccess } = useQuery({
    queryKey: ['draft'],
    queryFn: getDraft,
  });

  if (isSuccess) {
    window.localStorage.setItem('draft', JSON.stringify(draft.data));
  }

  return { saveDraftMutate, draft };
};

export default useDraftQuery;
