export interface PortfolioResponseData {
  fileUrl: string;
  fileName: string;
  fileSize: string;
  sequence: string;
}

export interface NewPortfolio extends PortfolioResponseData {
  id: string;
  file: File;
  presignedUrl: string;
}
