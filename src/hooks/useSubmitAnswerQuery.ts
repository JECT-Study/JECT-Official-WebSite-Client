import { useMutation } from '@tanstack/react-query';

import { postSubmitAnswer } from '@/apis/submitAnswer';

const useSubmitAnswerQuery = () => {
  const { mutate: submitAnswerMutate } = useMutation({
    mutationKey: ['submitAnswer'],
    mutationFn: postSubmitAnswer,
    onError: error => console.error(`Query Error : ${error}`),
  });

  return { submitAnswerMutate };
};

export default useSubmitAnswerQuery;
