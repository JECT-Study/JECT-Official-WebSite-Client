import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postRegisterMember } from '@/apis/apply';
import { RegisterMemberPayload, RegisterMemberResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useRegisterMemberMutation = (): UseMutationResult<
  ApiResponse<RegisterMemberResponse>,
  AxiosError,
  RegisterMemberPayload,
  unknown
> => {
  return useMutation({
    mutationKey: ['postRegisterMember'],
    mutationFn: postRegisterMember,
    onMutate: payload => {
      console.log('useRegisterMemberMutation 시작, payload:', payload);
    },
    onSuccess: data => {
      console.log('useRegisterMemberMutation 성공:', data);
    },
    onError: error => {
      console.error('useRegisterMemberMutation 에러:', error);
    },
  });
};
