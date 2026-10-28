import type { DateFieldInputError, DateFieldInputState } from "./dateField.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

interface DateFieldContextValue {
  inputState: DateFieldInputState | null;
  onInputStateChange: (state: DateFieldInputState | null) => void;
  onHelperMountChange: (mounted: boolean) => void;
}

export const [DateFieldProvider, useDateFieldContext] =
  createCtxProvider<DateFieldContextValue>("DateField");

const errorMessages: Record<DateFieldInputError, string> = {
  required: "날짜를 입력해 주세요.",
  incomplete: "날짜를 끝까지 입력해 주세요.",
  invalid: "유효한 날짜를 입력해 주세요.",
  outOfRange: "허용된 범위의 날짜를 입력해 주세요.",
  disabledDate: "선택할 수 없는 날짜예요. 다른 날짜를 입력해 주세요.",
};

export const getDateFieldErrorMessage = (error: DateFieldInputError | null): string =>
  error === null ? "" : errorMessages[error];
