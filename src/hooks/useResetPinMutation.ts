import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { putResetPin } from '@/apis/apply';
import { ResetPinPayload, ResetPinResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useResetPinMutation = (): UseMutationResult<
  ApiResponse<ResetPinResponse>,
  AxiosError,
  ResetPinPayload
> => {
  return useMutation({
    mutationKey: ['putResetPin'],
    mutationFn: putResetPin,
  });
};
