export { findJobFamilyOption, JOB_FAMILY_OPTIONS } from "@/constants/applyPageData";

export const DEFAULT_MAX_FILE_SIZE_MB = 100;

export const MB_TO_BYTES = 1024 * 1024;

//ObjectURL 해제 지연 시간 (ms) - 추가 요구사항 발생 시
export const OBJECT_URL_REVOKE_DELAY_MS = 5_000;

export const ALLOWED_FILE_TYPE = "application/pdf";

export const ALLOWED_FILE_EXTENSIONS = [".pdf"] as const;
