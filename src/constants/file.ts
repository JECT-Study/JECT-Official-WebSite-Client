export type FileExtension = 'pdf' | 'jpeg' | 'png' | 'zip' | 'ppt';

export const fileMimeType: Record<FileExtension, string> = {
  pdf: 'application/pdf',
  jpeg: '.jpg',
  png: 'image/png',
  zip: 'application/x-zip-compressed',
  ppt: 'application/vnd.ms-powerpoint',
};
