import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { PresignedUrl, FilesForPresignedUrl } from '@/types/apis/uploadFile';
import { requestHandler } from '@/utils/httpClient';

export const postUploadPortfolio = async (files: FilesForPresignedUrl[]) => {
  return await requestHandler<PresignedUrl[], FilesForPresignedUrl[]>(
    'post',
    API_ENDPOINT.uploadPortfolio,
    files,
  );
};
