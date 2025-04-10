export type JobFamily = 'PM' | 'PD' | 'FE' | 'BE';

export interface Question {
  id: number;
  sequence: number;
  inputType: 'TEXT' | 'URL' | 'FILE' | 'SELECT';
  isRequired: boolean;
  title: string;
  label: string;
  selectOptions: string[] | null;
  inputHint: string;
  maxTextLength: number | null;
  maxFileSize: number | null;
}

export interface PresignedUrlPayload {
  name: string;
  contentType: string;
  contentLength: number;
}

export interface PresignedUrlResponse {
  cdnUrl: string;
  presignedUrl: string;
  expiration: string;
}

export interface PortfolioResponse {
  fileUrl: string;
  fileName: string;
  fileSize: string;
  sequence: string;
}

export interface NewPortfolio extends PortfolioResponse {
  id: string;
  rawFile: File | null;
  presignedUrl: string | null;
}

export interface AnswersPayload {
  answers: Record<number, string>;
  portfolios: PortfolioResponse[];
}

export interface AnswersResponse extends AnswersPayload {
  jobFamily: JobFamily;
}

export type QuestionResponse = Question[];

export type ChangeJobRequest = JobFamily;
