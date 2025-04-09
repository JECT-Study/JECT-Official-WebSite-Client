import { useQuery } from '@tanstack/react-query';

import { getDraft } from '@/apis/draft';

const useDraftQuery = () => {
  const {
    data: draft,
    isError,
    error,
  } = useQuery({
    queryKey: ['getDraft'],
    queryFn: getDraft,
  });

  if (isError) {
    console.error(`Query Error : ${error}`);
  }

  return { draft };
};

export default useDraftQuery;
