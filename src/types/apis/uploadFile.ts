export interface PresignedUrlRequest {
  name: string;
  contentType: string;
  contentLength: number;
}

export interface PresignedUrlResponse {
  cdnUrl: string;
  presignedUrl: string;
  expiration: string;
}
