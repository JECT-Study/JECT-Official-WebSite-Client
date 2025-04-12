import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { PresignedUrlResponse, PresignedUrlRequest } from '@/types/apis/uploadFile';
import { requestHandler } from '@/utils/httpClient';

export const postUploadPortfolio = async (files: PresignedUrlRequest[]) => {
  return await requestHandler<PresignedUrlResponse[], PresignedUrlRequest[]>(
    'post',
    API_ENDPOINT.uploadPortfolio,
    files,
  );
};
