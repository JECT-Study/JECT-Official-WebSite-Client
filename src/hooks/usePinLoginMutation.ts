import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postPinLogin } from '@/apis/apply';
import { PinLoginPayload, PinLoginResponseData } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';
import { isLocalStorageEnabled, tokenUtils } from '@/utils/interceptor';

export const usePinLoginMutation = (): UseMutationResult<
  ApiResponse<PinLoginResponseData>,
  AxiosError,
  PinLoginPayload,
  unknown
> => {
  return useMutation({
    mutationFn: postPinLogin,
    onMutate: variables => {
      console.log('usePinLoginMutation 시작, variables:', variables);
    },
    onSuccess: data => {
      console.log('usePinLoginMutation 성공:', data);

      if (isLocalStorageEnabled && data.status === 'SUCCESS' && data.data) {
        const { accessToken, refreshToken } = data.data;
        tokenUtils.setAccessToken(accessToken);
        tokenUtils.setRefreshToken(refreshToken);
      }
    },
    onError: error => {
      console.error('usePinLoginMutation 에러:', error);
    },
  });
};
