import { useMutation } from '@tanstack/react-query';

import { postUploadPortfolio } from '@/apis/uploadPortfolio';

const useCreatePresignedUrlsQuery = () => {
  const {
    mutate: createPresignedUrlsMutate,
    isError,
    error,
  } = useMutation({
    mutationKey: ['create PresignedUrl'],
    mutationFn: postUploadPortfolio,
  });

  if (isError) {
    console.error(`Query Error : ${error}`);
  }

  return { createPresignedUrlsMutate };
};

export default useCreatePresignedUrlsQuery;
