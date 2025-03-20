import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { APPLY_MESSAGE } from '@/constants/applyMessages';
import { useToastActions } from '@/stores/toastStore';

const useUploadFileToS3Query = () => {
  const { addToast } = useToastActions();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ url, file }: { url: string; file: File }) =>
      axios.put(url, file, {
        headers: { 'Content-Type': file.type },
      }),
    onSuccess: () => addToast(APPLY_MESSAGE.success.uploadFile, 'positive'),
    onError: error => {
      if (axios.isAxiosError(error) && !error.response) {
        addToast(APPLY_MESSAGE.fail.uploadFile, 'negative');
      }
    },
  });

  return { mutate, isPending, isError };
};

export default useUploadFileToS3Query;
