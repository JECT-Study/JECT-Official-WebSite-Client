import { useQuery } from '@tanstack/react-query';

import { getJectalks } from '@/apis/jectalk';

const useJectalks = () => {
  const { data, isError, error } = useQuery({
    queryKey: ['jectalks'],
    queryFn: getJectalks,
  });

  if (isError) {
    console.error(`Query Error : ${error}`);
  }

  const jectalks = data?.data.content;

  return { jectalks };
};

export default useJectalks;
