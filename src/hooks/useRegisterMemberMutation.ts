import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postRegisterMember } from '@/apis/apply';
import { RegisterMemberPayload, RegisterMemberResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';
import { isLocalStorageEnabled, tokenUtils } from '@/utils/interceptor';

export interface RegisterMemberMutationVariables {
  pin: string;
  verificationToken: string;
}

export const useRegisterMemberMutation = (): UseMutationResult<
  ApiResponse<RegisterMemberResponse>,
  AxiosError,
  RegisterMemberMutationVariables,
  unknown
> => {
  return useMutation({
    mutationKey: ['postRegisterMember'],
    mutationFn: variables => {
      const { pin, verificationToken } = variables;

      if (isLocalStorageEnabled) {
        tokenUtils.removeTokens();
      }

      const payload: RegisterMemberPayload = { pin };

      const options = {
        headers: {
          Authorization: `Bearer ${verificationToken}`,
        },
      };

      return postRegisterMember(payload, options);
    },
    onMutate: variables => {
      console.log('useRegisterMemberMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('useRegisterMemberMutation 성공:', data);

      if (isLocalStorageEnabled && data.status === 'SUCCESS' && data.data) {
        const { accessToken, refreshToken } = data.data;
        tokenUtils.setAccessToken(accessToken);
        tokenUtils.setRefreshToken(refreshToken);
      }
    },
    onError: error => {
      console.error('useRegisterMemberMutation 에러:', error);
    },
  });
};
