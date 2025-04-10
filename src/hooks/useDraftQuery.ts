import { useQuery } from '@tanstack/react-query';

import { getDraft } from '@/apis/application';

const useDraftQuery = () => {
  const { data, isError, error } = useQuery({
    queryKey: ['getDraft'],
    queryFn: getDraft,
  });

  if (isError) {
    console.error('Query Error :', error);
  }

  return { data };
};

export default useDraftQuery;
