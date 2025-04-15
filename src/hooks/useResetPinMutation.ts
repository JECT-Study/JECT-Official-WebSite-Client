import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { putResetPin } from '@/apis/apply';
import { ResetPinPayload, ResetPinResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useResetPinMutation = (): UseMutationResult<
  ApiResponse<ResetPinResponse>,
  AxiosError,
  ResetPinPayload,
  unknown
> => {
  return useMutation({
    mutationKey: ['putResetPin'],
    mutationFn: putResetPin,
    onMutate: variables => {
      console.log('useResetPinMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('useResetPinMutation 성공:', data);
    },
    onError: error => {
      console.error('useResetPinMutation 에러:', error);
    },
  });
};
