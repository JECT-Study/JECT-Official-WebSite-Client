import { FileExtensions } from '@/types/ui/file';

export const fileMimeType: Record<FileExtensions, string> = {
  pdf: 'application/pdf',
  jpeg: '.jpg',
  png: 'image/png',
  zip: 'application/x-zip-compressed',
  ppt: 'application/vnd.ms-powerpoint',
};
