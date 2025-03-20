export interface Portfolio {
  fileUrl: string;
  fileName: string;
  fileSize: string;
  sequence: string;
}

export interface NewPortfolio extends Portfolio {
  id: string;
  file: File;
  presignedUrl: string;
}
