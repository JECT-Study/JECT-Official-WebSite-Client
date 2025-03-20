import { useMutation } from '@tanstack/react-query';

import { postUploadPortfolio } from '@/apis/uploadPortfolio';
import { FilesForPresignedUrl } from '@/types/apis/uploadFile';

const useCreatePresignedUrlsQuery = () => {
  const createPresignedUrls = useMutation({
    mutationFn: (files: FilesForPresignedUrl[]) => postUploadPortfolio(files),
  });

  return { createPresignedUrls };
};

export default useCreatePresignedUrlsQuery;
