import { useMutation, useQuery } from '@tanstack/react-query';

import { getDraft, postDraft } from '@/apis/draft';

const useDraftQuery = () => {
  const { mutate: saveDraftMutate } = useMutation({
    mutationFn: postDraft,
  });

  const { data: draft } = useQuery({
    queryKey: ['draft'],
    queryFn: getDraft,
  });

  return { saveDraftMutate, draft };
};

export default useDraftQuery;
