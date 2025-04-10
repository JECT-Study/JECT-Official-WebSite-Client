import { Status } from '@/types/apis/response';

export class InternalAPIError extends Error {
  status: Status;

  constructor(message: string, status: Status) {
    super(message);
    this.name = 'InternalAPIError';
    this.status = status;
  }
}

export class ExternalAPIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ExternalAPIError';
    this.status = status;
  }
}

export class NetworkError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'NetworkError';
    this.code = code;
  }
}
