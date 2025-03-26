export interface Answers {
  answers: Record<string, string>;
  portfolios: PortfolioResponse[];
}
export interface PortfolioResponse {
  fileUrl: string;
  fileName: string;
  fileSize: string;
  sequence: string;
}

export interface NewPortfolio extends PortfolioResponse {
  id: string;
  file: File;
  presignedUrl: string;
}
