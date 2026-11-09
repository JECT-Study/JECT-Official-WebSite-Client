import type { TimeFieldInputError, TimeFieldInputState } from "./timeField.types";
import type { TimeStep } from "../TimePicker";

import { createCtxProvider } from "@/hooks/createCtxProvider";

/** Input이 Root와 Helper에 알리는 현재 상태와 그 상태의 오류 메시지 */
export interface TimeFieldInputReport {
  state: TimeFieldInputState;
  errorMessage: string;
}

interface TimeFieldContextValue {
  inputReport: TimeFieldInputReport | null;
  onInputReport: (report: TimeFieldInputReport | null) => void;
  onHelperMountChange: (mounted: boolean) => void;
}

export const [TimeFieldProvider, useTimeFieldContext] =
  createCtxProvider<TimeFieldContextValue>("TimeField");

const errorMessages: Record<Exclude<TimeFieldInputError, "stepMismatch">, string> = {
  required: "시각을 입력해 주세요.",
  incomplete: "시각을 끝까지 입력해 주세요.",
  invalid: "유효한 시각을 입력해 주세요.",
  outOfRange: "허용된 범위의 시각을 입력해 주세요.",
};

export const getTimeFieldErrorMessage = (
  error: TimeFieldInputError | null,
  minuteStep: TimeStep,
): string => {
  if (error === null) return "";
  if (error === "stepMismatch") return `분은 ${minuteStep}분 단위로 입력해 주세요.`;
  return errorMessages[error];
};
