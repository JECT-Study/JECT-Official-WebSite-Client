/**
 * 주어진 FileList에서 모든 파일이 types 확장자 목록에 해당하는지 검사하는 함수
 *
 * @param files 검사할 `FileList` 객체
 * @param types 허용할 파일 확장자 목록 (예: ['.pdf', '.png'])
 * @returns 모든 파일이 허용된 확장자에 해당하면 `true`, 그렇지 않으면 `false`
 *
 */
type FileType = '.pdf' | '.jpeg' | '.png' | '.zip' | '.ppt';

const fileType = {
  '.pdf': 'application/pdf',
  '.jpeg': '.jpg',
  '.png': 'image/png',
  '.zip': 'application/x-zip-compressed',
  '.ppt': 'application/vnd.ms-powerpoint',
};

export const checkFileType = (files: FileList, types: FileType[]) => {
  return Array.from(files).every(file => {
    return types.some(type => fileType[type] === file.type);
  });
};
