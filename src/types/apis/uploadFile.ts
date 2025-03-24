export interface FilesForPresignedUrl {
  name: string;
  contentType: string;
  contentLength: number;
}

export interface PresignedUrlResponseData {
  keyName: string;
  presignedUrl: string;
  expiration: string;
}
