import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { putUploadFileToS3 } from '@/apis/application';
import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { useDialogActions } from '@/stores/dialogStore';
import { useToastActions } from '@/stores/toastStore';
import { PresignedUrlResponse } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

interface UploadFileToS3MutationVariable {
  url: string;
  file: File;
}

const useUploadFileToS3Mutation = () => {
  const source = axios.CancelToken.source();
  const [isNetworkError, setIsNetworkError] = useState(false);
  const { addToast } = useToastActions();
  const { openDialog } = useDialogActions();

  const {
    mutate,
    isPending,
  }: UseMutationResult<
    AxiosResponse<ApiResponse<PresignedUrlResponse>>,
    AxiosError,
    UploadFileToS3MutationVariable,
    unknown
  > = useMutation({
    mutationKey: ['S3'],
    mutationFn: ({ url, file }) => putUploadFileToS3(url, file, source.token),
    onSuccess: () => addToast(APPLY_MESSAGE.success.uploadFile, 'positive'),
    onError: error => {
      if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
        addToast(APPLY_MESSAGE.fail.uploadFile, 'negative');
        setIsNetworkError(true);
        return;
      }

      openDialog({ type: 'failedUploadFile' });
    },
  });

  return { mutate, isPending, isNetworkError, source };
};

export default useUploadFileToS3Mutation;
