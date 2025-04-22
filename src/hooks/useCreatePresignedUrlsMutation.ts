import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postUploadPortfolio } from '@/apis/application';
import { PresignedUrlPayload, PresignedUrlResponse } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

const useCreatePresignedUrlsMutation = (): UseMutationResult<
  ApiResponse<PresignedUrlResponse>,
  AxiosError,
  PresignedUrlPayload,
  unknown
> => {
  return useMutation({
    mutationKey: ['create PresignedUrl'],
    mutationFn: postUploadPortfolio,
  });
};

export default useCreatePresignedUrlsMutation;
