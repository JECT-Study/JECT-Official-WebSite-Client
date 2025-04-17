import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postPinLogin } from '@/apis/apply';
import { PinLoginPayload, PinLoginResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const usePinLoginMutation = (): UseMutationResult<
  ApiResponse<PinLoginResponse>,
  AxiosError,
  PinLoginPayload
> => {
  return useMutation({
    mutationKey: ['postPinLogin'],
    mutationFn: postPinLogin,
    onMutate: variables => {
      console.log('usePinLoginMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('usePinLoginMutation 성공:', data);
    },
    onError: error => {
      console.error('usePinLoginMutation 에러:', error);
    },
  });
};
