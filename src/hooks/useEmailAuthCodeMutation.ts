import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postEmailAuthCode } from '@/apis/apply';
import { Email } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useEmailAuthCodeMutation = (): UseMutationResult<
  ApiResponse<boolean>,
  AxiosError,
  Email,
  unknown
> => {
  return useMutation({
    mutationKey: ['postEmailAuthCode'],
    mutationFn: postEmailAuthCode,
    onMutate: email => {
      console.log('mutation 시작, email:', email);
    },
    onSuccess: data => {
      console.log('mutation 성공:', data);
    },
    onError: error => {
      console.error('mutation 에러:', error);
    },
  });
};
