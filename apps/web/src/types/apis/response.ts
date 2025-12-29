export type Status =
  | "SUCCESS"
  | "GLOBAL-1"
  | "GLOBAL-2"
  | "GLOBAL-3"
  | "GLOBAL-4"
  | "GLOBAL-5"
  | "GLOBAL-6"
  | "GLOBAL-7"
  | "GLOBAL-8"
  | "GLOBAL-9"
  | "GLOBAL-10"
  | "GLOBAL-11"
  | "GLOBAL-12"
  | "GLOBAL-13"
  | "GLOBAL-14"
  | "GLOBAL-15"
  //TODO: 하단 부 동일하게 수정된 에러코드에 맞춰서 반영해야함
  | "INVALID_AUTH_CODE"
  | "NOT_FOUND_AUTH_CODE"
  | "INVALID_EXTENSION"
  | "NOT_FOUND_MEMBER"
  | "ALREADY_EXIST_MEMBER"
  | "PROJECT_NOT_FOUND"
  | "QUESTION_NOT_FOUND"
  | "RECRUIT_NOT_FOUND"
  | "TEMP_APPLICATION_NOT_FOUND"
  | "INVALID_CREDENTIALS"
  | "VALIDATION_ERROR";

export interface ApiResponse<T> {
  status: Status;
  timestamp: string;
  data: T;
}
