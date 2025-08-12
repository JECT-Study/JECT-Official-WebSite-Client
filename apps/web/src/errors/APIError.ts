import { Status } from '@/types/apis/response';

export class InternalAPIError extends Error {
  status: Status;
  url: string;

  constructor(message: string, status: Status, url: string) {
    super(message);
    this.name = 'InternalAPIError';
    this.status = status;
    this.url = url;
  }
}

export class ExternalAPIError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = 'ExternalAPIError';
    this.status = status;
    this.url = url;
  }
}

export class NetworkError extends Error {
  code?: string;
  url?: string;

  constructor(message: string, code?: string, url?: string) {
    super(message);
    this.name = 'NetworkError';
    this.code = code;
    this.url = url;
  }
}
