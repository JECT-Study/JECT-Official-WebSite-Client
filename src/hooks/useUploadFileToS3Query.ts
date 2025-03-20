import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { putUploadFileToS3 } from '@/apis/uploadFileToS3';
import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { useToastActions } from '@/stores/toastStore';

const useUploadFileToS3Query = () => {
  const { addToast } = useToastActions();

  const {
    mutate: uploadFileMutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: putUploadFileToS3,
    onSuccess: () => addToast(APPLY_MESSAGE.success.uploadFile, 'positive'),
    onError: error => {
      if (axios.isAxiosError(error) && !error.response) {
        addToast(APPLY_MESSAGE.fail.uploadFile, 'negative');
      }
    },
    retry: 3,
  });

  return { uploadFileMutate, isPending, isError };
};

export default useUploadFileToS3Query;
