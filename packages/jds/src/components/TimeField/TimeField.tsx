import { forwardRef, useState } from "react";

import { TimeFieldHelper } from "./compound/Helper";
import { TimeFieldInput } from "./compound/Input";
import { TimeFieldProvider, type TimeFieldInputReport } from "./timeField.context";
import type { TimeFieldProps } from "./timeField.types";
import { Field } from "../Field";

const TimeFieldRoot = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ children, status, ...props }, ref) => {
    const [inputReport, setInputReport] = useState<TimeFieldInputReport | null>(null);
    const [hasHelper, setHasHelper] = useState(false);
    const isErrorVisible = inputReport?.state.isErrorVisible ?? false;

    return (
      <TimeFieldProvider
        value={{ inputReport, onInputReport: setInputReport, onHelperMountChange: setHasHelper }}
      >
        <Field ref={ref} {...props} status={isErrorVisible ? "error" : status}>
          {children}
          {isErrorVisible && !hasHelper && <Field.Helper>{inputReport?.errorMessage}</Field.Helper>}
        </Field>
      </TimeFieldProvider>
    );
  },
);

TimeFieldRoot.displayName = "TimeField";

/**
 * @description 하루 안의 특정 시각을 직접 입력하거나 시간 선택에서 고르는 필드.
 * 오전/오후, 시, 분을 세그먼트 단위로 편집하며 값은 "HH:mm" 형식의 24시간제 문자열이다.
 *
 * @example
 * ```tsx
 * <TimeField required>
 *   <TimeField.Label>시작 시각</TimeField.Label>
 *   <TimeField.Input name="startTime" value={time} onChange={setTime} />
 *   <TimeField.Helper>5분 단위로 입력해 주세요</TimeField.Helper>
 * </TimeField>
 * ```
 */
export const TimeField = Object.assign(TimeFieldRoot, {
  Label: Field.Label,
  Input: TimeFieldInput,
  Helper: TimeFieldHelper,
});
