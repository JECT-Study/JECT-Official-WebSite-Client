export type Status =
  | "SUCCESS"
  | "G-01"
  | "G-02"
  | "G-03"
  | "G-04"
  | "G-05"
  | "G-06"
  | "G-07"
  | "G-08"
  | "G-09"
  | "G-10"
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
