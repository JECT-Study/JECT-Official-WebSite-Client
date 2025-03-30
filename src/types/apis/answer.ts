import { JobFamily } from './question';

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

export interface AnswersRequest {
  answers: Record<string, string>;
  portfolios: PortfolioResponse[];
}

export interface AnswersResponse extends AnswersRequest {
  jobFamily: JobFamily;
}
