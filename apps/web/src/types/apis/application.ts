export type {
  JobFamily,
  Question,
  QuestionInputType,
  PortfolioResponse,
} from "@/apis/apply/schemas";

import type { JobFamily, Question, PortfolioResponse } from "@/apis/apply/schemas";

export type QuestionId = Question["id"];

export type AnswersByQuestionId = Record<QuestionId, string>;

export interface UploadFileMeta {
  name: string;
  contentType: string;
  contentLength: number;
}

export interface PresignedFileUrls {
  cdnUrl: string;
  presignedUrl: string;
  expiration: string;
}

/**
 * 클라이언트 포트폴리오 파일 (도메인 모델)
 *
 * @description
 * - 업로드 완료 상태: pendingUpload가 없음
 * - 업로드 대기 상태: pendingUpload가 존재
 */
export interface PortfolioFile {
  id: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  /** 업로드 대기 상태 (존재하면 업로드 필요) */
  pendingUpload?: {
    rawFile: File;
    presignedUrl: string;
  };
}

/**
 * @deprecated NewPortfolio 대신 PortfolioFile 사용
 * 마이그레이션 완료 후 제거 예정
 */
export interface NewPortfolio extends PortfolioResponse {
  id: string;
  rawFile: File | null;
  presignedUrl: string | null;
}

export interface AnswersPayload {
  answers: Record<number, string>;
  portfolios: PortfolioResponse[];
}

export interface AnswersResponse extends AnswersPayload {
  jobFamily: JobFamily;
}

export type PresignedUrlPayload = UploadFileMeta[];

export type PresignedUrlResponse = PresignedFileUrls[];

export type QuestionResponse = {
  questionResponses: Question[];
};

export type ChangeJobRequest = JobFamily;
