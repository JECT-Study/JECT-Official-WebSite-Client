import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { PresignedUrlResponseData, FilesForPresignedUrl } from '@/types/apis/uploadFile';
import { requestHandler } from '@/utils/httpClient';

export const postUploadPortfolio = async (files: FilesForPresignedUrl[]) => {
  return await requestHandler<PresignedUrlResponseData[], FilesForPresignedUrl[]>(
    'post',
    API_ENDPOINT.uploadPortfolio,
    files,
  );
};
