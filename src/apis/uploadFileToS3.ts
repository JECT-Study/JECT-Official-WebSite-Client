import axios, { CancelToken } from 'axios';

export const putUploadFileToS3 = async (url: string, file: File, cancelToken: CancelToken) => {
  return axios.put(url, file, {
    headers: { 'Content-Type': file.type },
    cancelToken,
  });
};
