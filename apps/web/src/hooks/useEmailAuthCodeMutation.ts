import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postEmailAuthCode } from '@/apis/apply';
import { EmailAuthPayload } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useEmailAuthCodeMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  EmailAuthPayload
> => {
  return useMutation({
    mutationKey: ['postEmailAuthCode'],
    mutationFn: postEmailAuthCode,
  });
};
