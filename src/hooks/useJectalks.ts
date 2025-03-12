import { useQuery } from '@tanstack/react-query';

import { getJectalks } from '@/apis/jectalk';

const useJectalks = () => {
  const { data } = useQuery({
    queryKey: ['jectalks'],
    queryFn: getJectalks,
  });
  const jectalks = data?.data.content;

  return { jectalks };
};

export default useJectalks;
