import { forwardRef, useState } from "react";

import { DateFieldHelper } from "./compound/Helper";
import { DateFieldInput } from "./compound/Input";
import { DateFieldProvider, getDateFieldErrorMessage } from "./dateField.context";
import type { DateFieldInputState, DateFieldProps } from "./dateField.types";
import { Field } from "../Field";

const DateFieldRoot = forwardRef<HTMLDivElement, DateFieldProps>(
  ({ children, status, ...props }, ref) => {
    const [inputState, setInputState] = useState<DateFieldInputState | null>(null);
    const [hasHelper, setHasHelper] = useState(false);
    const isErrorVisible = inputState?.isErrorVisible ?? false;

    return (
      <DateFieldProvider
        value={{ inputState, onInputStateChange: setInputState, onHelperMountChange: setHasHelper }}
      >
        <Field ref={ref} {...props} status={isErrorVisible ? "error" : status}>
          {children}
          {isErrorVisible && !hasHelper && (
            <Field.Helper>{getDateFieldErrorMessage(inputState?.error ?? null)}</Field.Helper>
          )}
        </Field>
      </DateFieldProvider>
    );
  },
);

DateFieldRoot.displayName = "DateField";

/**
 * @description 특정 날짜를 직접 입력하거나 달력에서 선택하는 필드.
 * 연, 월, 일을 세그먼트 단위로 편집하며 값은 "YYYY-MM-DD" 형식의 문자열이다.
 *
 * @example
 * ```tsx
 * <DateField required>
 *   <DateField.Label>시작일</DateField.Label>
 *   <DateField.Input name="startDate" value={date} onChange={setDate} />
 *   <DateField.Helper>오늘 이후 날짜를 입력해주세요</DateField.Helper>
 * </DateField>
 * ```
 */
export const DateField = Object.assign(DateFieldRoot, {
  Label: Field.Label,
  Input: DateFieldInput,
  Helper: DateFieldHelper,
});
