import { FileExtension, fileMimeType } from '@/constants/file';

/**
 * 주어진 FileList에서 모든 파일이 types 확장자 목록에 해당하는지 검사하는 함수
 *
 * @param files 검사할 `FileList` 객체
 * @param types 허용할 파일 확장자 목록 (예: ['.pdf', '.png'])
 * @returns 모든 파일이 허용된 확장자에 해당하면 `true`, 그렇지 않으면 `false`
 *
 */
export const checkFileType = (files: FileList, types: FileExtension[]) => {
  return Array.from(files).every(file => {
    return types.some(type => fileMimeType[type] === file.type);
  });
};
