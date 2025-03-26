import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postVerificationEmailCode } from '@/apis/apply';
import {
  VerificationEmailCodePayload,
  VerificationEmailCodeResponseData,
} from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useVerificationEmailCodeMutation = (): UseMutationResult<
  ApiResponse<VerificationEmailCodeResponseData>,
  AxiosError,
  VerificationEmailCodePayload,
  unknown
> => {
  return useMutation({
    mutationFn: postVerificationEmailCode,
    onMutate: variables => {
      console.log('useVerificationEmailCodeMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('useVerificationEmailCodeMutation 성공:', data);
    },
    onError: error => {
      console.error('useVerificationEmailCodeMutation 에러:', error);
    },
  });
};
