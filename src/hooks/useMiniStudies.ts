import { useQuery } from '@tanstack/react-query';

import { fetchMiniStudies } from '@/apis/miniStudy';

const useMiniStudies = () => {
  const { data } = useQuery({
    queryKey: ['miniStudies'],
    queryFn: fetchMiniStudies,
  });

  const miniStudies = data?.content;

  return { miniStudies };
};

export default useMiniStudies;
