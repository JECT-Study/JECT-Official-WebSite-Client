import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { putUploadFileToS3 } from '@/apis/uploadFileToS3';
import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { useDialogActions } from '@/stores/dialogStore';
import { useToastActions } from '@/stores/toastStore';

interface MutationProps {
  url: string;
  file: File;
}

const useUploadFileToS3Query = () => {
  const source = axios.CancelToken.source();
  const [isNetworkError, setIsNetworkError] = useState(false);
  const { addToast } = useToastActions();
  const { openDialog } = useDialogActions();

  const { mutate: uploadFileMutate, isPending } = useMutation({
    mutationKey: ['S3'],
    mutationFn: ({ url, file }: MutationProps) => putUploadFileToS3(url, file, source.token),
    onSuccess: () => addToast(APPLY_MESSAGE.success.uploadFile, 'positive'),
    onError: error => {
      if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
        addToast(APPLY_MESSAGE.fail.uploadFile, 'negative');
      }

      openDialog({ type: 'failedUploadFile' });
      setIsNetworkError(true);
    },
  });

  return { uploadFileMutate, isPending, isNetworkError, source };
};

export default useUploadFileToS3Query;
