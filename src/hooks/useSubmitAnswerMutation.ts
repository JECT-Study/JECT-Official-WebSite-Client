import { useMutation } from '@tanstack/react-query';

import { postSubmitAnswer } from '@/apis/submitAnswer';

const useSubmitAnswerMutation = () => {
  return useMutation({
    mutationKey: ['submitAnswer'],
    mutationFn: postSubmitAnswer,
    onError: error => console.error(`Query Error : ${error}`),
  });
};

export default useSubmitAnswerMutation;
