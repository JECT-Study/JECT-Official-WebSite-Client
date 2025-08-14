import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { checkEmailExists } from '@/apis/apply';
import { Email } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useCheckEmailExistsMutation = (): UseMutationResult<
  ApiResponse<boolean>,
  AxiosError,
  Email
> => {
  return useMutation({
    mutationKey: ['checkEmailExists'],
    mutationFn: checkEmailExists,
  });
};
