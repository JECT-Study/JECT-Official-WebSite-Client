export interface FilesForPresignedUrl {
  name: string;
  contentType: string;
  contentLength: number;
}

export interface PresignedUrl {
  keyName: string;
  presignedUrl: string;
  expiration: string;
}
