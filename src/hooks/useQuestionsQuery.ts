import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '@/apis/question';
import { JobFamily } from '@/types/apis/question';

const useQuestionsQuery = (param: JobFamily | null) => {
  const {
    data: questions,
    isError,
    error,
  } = useQuery({
    queryKey: ['question', param],
    queryFn: () => getQuestions(param),
    enabled: !!param,
  });

  if (isError) console.error(`Query Error ${error}`);

  return { questions };
};

export default useQuestionsQuery;
