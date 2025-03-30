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
