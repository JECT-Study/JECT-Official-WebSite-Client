import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { putMemberProfileInitial } from '@/apis/apply';
import { MemberProfileInitialPayload, MemberProfileInitialResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useMemberProfileInitialMutation = (): UseMutationResult<
  ApiResponse<MemberProfileInitialResponse>,
  AxiosError,
  MemberProfileInitialPayload
> => {
  return useMutation({
    mutationKey: ['putMemberProfileInitial'],
    mutationFn: putMemberProfileInitial,
  });
};
