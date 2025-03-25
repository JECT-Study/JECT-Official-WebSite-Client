import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '@/apis/question';
import { JobFamily } from '@/types/apis/question';

const useQuestionsQuery = (param: JobFamily | null) => {
  const { data, isError, error } = useQuery({
    queryKey: ['question', param],
    queryFn: () => getQuestions(param),
    enabled: !!param,
  });

  if (isError) console.error(`Query Error ${error}`);

  const questions = data?.data;

  return { questions };
};

export default useQuestionsQuery;
