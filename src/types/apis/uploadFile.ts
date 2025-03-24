export interface FilesForPresignedUrl {
  name: string;
  contentType: string;
  contentLength: number;
}

export interface PresignedUrl {
  cdnUrl: string;
  presignedUrl: string;
  expiration: string;
}
