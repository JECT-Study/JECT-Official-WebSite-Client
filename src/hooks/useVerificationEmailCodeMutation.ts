import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postVerificationEmailCode } from '@/apis/apply';
import {
  VerificationEmailCodePayload,
  VerificationEmailCodeQueryParams,
  VerificationEmailCodeResponse,
} from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export interface VerificationEmailCodeMutationVariables {
  payload: VerificationEmailCodePayload;
  queryParams: VerificationEmailCodeQueryParams;
}

export const useVerificationEmailCodeMutation = (): UseMutationResult<
  ApiResponse<VerificationEmailCodeResponse>,
  AxiosError,
  VerificationEmailCodeMutationVariables
> => {
  return useMutation({
    mutationKey: ['postVerificationEmailCode'],
    mutationFn: ({ payload, queryParams }) => postVerificationEmailCode(payload, queryParams),
  });
};
