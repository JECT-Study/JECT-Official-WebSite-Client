import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { putUploadFileToS3 } from '@/apis/uploadFileToS3';
import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { useToastActions } from '@/stores/toastStore';

interface MutationProps {
  url: string;
  file: File;
}

const useUploadFileToS3Mutation = () => {
  const source = axios.CancelToken.source();
  const [isNetworkError, setIsNetworkError] = useState(false);
  const { addToast } = useToastActions();

  const { mutate: uploadFileMutate, isPending } = useMutation({
    mutationKey: ['S3'],
    mutationFn: ({ url, file }: MutationProps) => putUploadFileToS3(url, file, source.token),
    onSuccess: () => addToast(APPLY_MESSAGE.success.uploadFile, 'positive'),
    onError: error => {
      if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
        setIsNetworkError(true);
        addToast(APPLY_MESSAGE.fail.uploadFile, 'negative');
      }
      console.error(`Query Error : ${error}`);
    },
  });

  return { uploadFileMutate, isPending, isNetworkError, source };
};

export default useUploadFileToS3Mutation;
