import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postEmailAuthCode } from '@/apis/apply';
import { EmailAuthPayload } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useEmailAuthCodeMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  EmailAuthPayload,
  unknown
> => {
  return useMutation({
    mutationKey: ['postEmailAuthCode'],
    mutationFn: postEmailAuthCode,
    onMutate: variables => {
      console.log('useEmailAuthCodeMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('useEmailAuthCodeMutation 성공:', data);
    },
    onError: error => {
      console.error('useEmailAuthCodeMutation 에러:', error);
    },
  });
};
