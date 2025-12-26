import type {
  NewPortfolio,
  PortfolioFile,
  PortfolioResponse,
  PresignedFileUrls,
} from "@/types/apis/application";

/**
 * 파일별 고유 ID 생성
 * @description 파일명 + 크기 + 타임스탬프로 identity 생성
 */
const generateFileId = (file: File): string => {
  return `${file.name}-${file.size}-${Date.now()}`;
};

/**
 * presigned URL 응답과 파일을 PortfolioFile로 변환
 * @description
 * - 파일 단위 identity 사용 (index 의존 X)
 * - pendingUpload 포함 (업로드 대기 상태)
 */
export const createPortfolioFiles = (
  presignedData: PresignedFileUrls[],
  files: File[],
): PortfolioFile[] => {
  return files.map((file, index) => ({
    id: generateFileId(file),
    fileUrl: presignedData[index].cdnUrl,
    fileName: file.name,
    fileSize: file.size.toString(),
    pendingUpload: {
      rawFile: file,
      presignedUrl: presignedData[index].presignedUrl,
    },
  }));
};

/**
 * 업로드 완료 후 pendingUpload 제거
 */
export const markAsUploaded = (portfolio: PortfolioFile): PortfolioFile => {
  const { pendingUpload, ...uploaded } = portfolio;
  void pendingUpload; // 사용하지 않음
  return uploaded;
};

/**
 * File 객체를 presigned URL 요청 형식으로 변환
 */
export const formatForPresignedUrl = (files: File[]) => {
  return files.map(({ name, type, size }) => ({
    name,
    contentType: type,
    contentLength: size,
  }));
};

/**
 * 임시저장된 포트폴리오 데이터를 PortfolioFile로 변환
 * @description 서버에서 불러온 데이터이므로 pendingUpload 가 없음
 */
export const formatDraftPortfolios = (values: PortfolioResponse[]): PortfolioFile[] => {
  return values.map(file => {
    const uuid = file.fileUrl.substring(file.fileUrl.lastIndexOf("_") + 1);
    return {
      id: uuid,
      fileUrl: file.fileUrl,
      fileName: file.fileName,
      fileSize: file.fileSize,
    };
  });
};

/**
 * PortfolioFile을 API 요청용 PortfolioResponse로 변환
 */
export const formatPortfolioResponse = (portfolios: PortfolioFile[]): PortfolioResponse[] => {
  return portfolios.map(({ fileUrl, fileName, fileSize }, index) => ({
    fileUrl,
    fileName,
    fileSize,
    sequence: (index + 1).toString(),
  }));
};

/**
 * @deprecated createPortfolioFiles 사용하는 구버전 포매터
 */
export const formatRawFiles = (data: PresignedFileUrls[], files: File[]): NewPortfolio[] => {
  return data.map((item, index) => ({
    id: crypto.randomUUID(),
    rawFile: files[index],
    presignedUrl: item.presignedUrl,
    fileUrl: item.cdnUrl,
    fileName: files[index].name,
    fileSize: files[index].size.toString(),
    sequence: index.toString(),
  }));
};
