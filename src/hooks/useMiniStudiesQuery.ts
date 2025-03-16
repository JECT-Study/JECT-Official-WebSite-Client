import { useQuery } from '@tanstack/react-query';

import { getMiniStudies } from '@/apis/miniStudy';

const useMiniStudies = () => {
  const { data, isError, error } = useQuery({
    queryKey: ['miniStudies'],
    queryFn: getMiniStudies,
  });

  if (isError) {
    console.error(`Query Error : ${error}`);
  }

  const miniStudies = data?.data.content;

  return { miniStudies };
};

export default useMiniStudies;
