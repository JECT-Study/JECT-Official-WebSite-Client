import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '@/apis/application';
import { JobFamily } from '@/types/apis/application';

const useQuestionsQuery = (jobFamily: JobFamily | null) => {
  const { data, isError, error } = useQuery({
    queryKey: ['question', jobFamily],
    queryFn: () => {
      if (!jobFamily) throw new Error('jobFamily is null');
      return getQuestions(jobFamily);
    },
    enabled: !!jobFamily,
  });

  if (isError) console.error(`Query Error ${error}`);

  return { data };
};

export default useQuestionsQuery;
