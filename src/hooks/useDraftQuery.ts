import { useQuery } from '@tanstack/react-query';

import { getDraft } from '@/apis/draft';

const useDraftQuery = () => {
  const { data: draft } = useQuery({
    queryKey: ['getDraft'],
    queryFn: getDraft,
  });

  return { draft };
};

export default useDraftQuery;
