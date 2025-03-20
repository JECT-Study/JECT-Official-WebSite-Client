import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '@/apis/question';
import { JobFamily } from '@/types/apis/question';

const jobFamily: Record<string, JobFamily> = {
  '프론트엔드 개발자': 'FE',
  '백엔드 개발자': 'BE',
  '프로덕트 매니저': 'PM',
  '프로덕트 디자이너': 'PD',
};

const useQuestionsQuery = (param: string) => {
  const { data, isError, error } = useQuery({
    queryKey: ['question', param],
    queryFn: () => getQuestions(jobFamily[param]),
    enabled: !!param,
  });

  if (isError) console.error(`Query Error ${error}`);

  const questions = data?.data;

  return { questions };
};

export default useQuestionsQuery;
