import { FileExtension } from '@/types/ui/file';

export const fileMimeType: Record<FileExtension, string> = {
  pdf: 'application/pdf',
  jpeg: '.jpg',
  png: 'image/png',
  zip: 'application/x-zip-compressed',
  ppt: 'application/vnd.ms-powerpoint',
};
