import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '@/apis/application';
import { JobFamily } from '@/types/apis/application';

const useQuestionsQuery = (param: JobFamily | null) => {
  const { data, isError, error } = useQuery({
    queryKey: ['question', param],
    queryFn: () => getQuestions(param),
    enabled: !!param,
  });

  if (isError) console.error(`Query Error ${error}`);

  return { data };
};

export default useQuestionsQuery;
