import { NewPortfolio } from '@/types/apis/answer';
/**
 * 파일 객체(File 또는 NewPortfolio)를 받아 공통된 파일 정보를 추출하는 함수
 *
 * 이 함수는 File 또는 NewPortfolio 타입의 파일 객체를 인자로 받아,
 * 화면 렌더링 및 업로드 등에 필요한 속성들을 통일된 형태로 반환합니다.
 *
 * @param file - File 또는 NewPortfolio 타입의 파일 객체
 * @returns 추출된 파일 정보를 담은 객체 (ExtractedFileInfo)

 */
type ExtractedFileInfo = {
  id: number | string;
  fileName: string;
  fileSize: number;
  rawFile: File;
  fileUrl?: string;
  presignedUrl?: string;
};

export const extractFileInfo = (file: File | NewPortfolio): ExtractedFileInfo => {
  if (file instanceof File) {
    return {
      id: file.lastModified,
      fileName: file.name,
      fileSize: file.size,
      rawFile: file,
    };
  }

  return {
    id: file.id,
    fileName: file.fileName,
    fileSize: Number(file.fileSize),
    fileUrl: file.fileUrl,
    presignedUrl: file.presignedUrl,
    rawFile: file.file,
  };
};
