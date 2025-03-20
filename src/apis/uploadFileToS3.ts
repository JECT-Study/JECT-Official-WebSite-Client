import axios from 'axios';

interface PutUploadFileToS3Props {
  url: string;
  file: File;
}

export const putUploadFileToS3 = async ({ url, file }: PutUploadFileToS3Props) => {
  return axios.put(url, file, {
    headers: { 'Content-Type': file.type },
  });
};
