import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { checkEmailExists } from '@/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useCheckEmailExistsMutation = (): UseMutationResult<
  ApiResponse<boolean>,
  AxiosError,
  string,
  unknown
> => {
  return useMutation({
    mutationFn: checkEmailExists,
    onMutate: email => {
      console.log('useCheckEmailExistsMutation 시작, email:', email);
    },
    onSuccess: data => {
      console.log('useCheckEmailExistsMutation 성공:', data);
    },
    onError: error => {
      console.error('useCheckEmailExistsMutation 에러:', error);
    },
  });
};
