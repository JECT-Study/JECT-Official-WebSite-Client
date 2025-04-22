import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postRegisterMember } from '@/apis/apply';
import { RegisterMemberPayload, RegisterMemberResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useRegisterMemberMutation = (): UseMutationResult<
  ApiResponse<RegisterMemberResponse>,
  AxiosError,
  RegisterMemberPayload
> => {
  return useMutation({
    mutationKey: ['postRegisterMember'],
    mutationFn: postRegisterMember,
  });
};
