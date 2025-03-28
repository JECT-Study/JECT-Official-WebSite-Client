import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { putMemberProfileInitial } from '@/apis/apply';
import { MemberProfileInitialPayload, MemberProfileInitialResponseData } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useMemberProfileInitialMutation = (): UseMutationResult<
  ApiResponse<MemberProfileInitialResponseData>,
  AxiosError,
  MemberProfileInitialPayload,
  unknown
> => {
  return useMutation({
    mutationFn: putMemberProfileInitial,
    onMutate: variables => {
      console.log('useMemberProfileInitialMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('useMemberProfileInitialMutation 성공:', data);
    },
    onError: error => {
      console.error('useMemberProfileInitialMutation 에러:', error);
    },
  });
};
