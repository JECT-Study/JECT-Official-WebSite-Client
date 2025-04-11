import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '@/apis/question';
import { JobFamily } from '@/types/apis/question';

const useQuestionsQuery = (param: JobFamily | null) => {
  return useQuery({
    queryKey: ['question', param],
    queryFn: () => getQuestions(param),
    enabled: !!param,
    retry: 0,
  });
};

export default useQuestionsQuery;
