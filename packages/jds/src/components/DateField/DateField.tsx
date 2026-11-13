import { forwardRef, useState } from "react";

import { DateFieldHelper } from "./compound/Helper";
import { DateFieldInput } from "./compound/Input";
import { DateFieldProvider } from "./dateField.context";
import type { DateFieldProps } from "./dateField.types";
import { Field } from "../Field";

const INPUT_ERROR_MESSAGE = "유효한 날짜를 입력해 주세요.";

/**
 * 루트는 내부 Field primitive를 감싸 status, readonly, disabled, required를 전달한다.
 * 날짜가 만들어지지 않은 입력(incomplete, invalid)이 보일 때는 사용처의 status와 Helper 문구 대신 DateField의 문구와 error 상태를 보여 준다.
 * 이때 폼 값은 빈 문자열이라 폼 라이브러리는 필수 오류로 판단하는데, 실제 문제는 잘못 입력한 날짜이기 때문이다.
 * 그 밖의 오류 문구와 status는 사용처가 정한다.
 */
const DateFieldRoot = forwardRef<HTMLDivElement, DateFieldProps>(
  ({ children, status = "default", ...props }, ref) => {
    const [isInputErrorVisible, setIsInputErrorVisible] = useState(false);
    const [hasHelper, setHasHelper] = useState(false);
    const inputErrorMessage = isInputErrorVisible ? INPUT_ERROR_MESSAGE : null;

    return (
      <DateFieldProvider
        value={{
          inputErrorMessage,
          onInputErrorVisibleChange: setIsInputErrorVisible,
          onHelperMountChange: setHasHelper,
        }}
      >
        <Field ref={ref} {...props} status={inputErrorMessage === null ? status : "error"}>
          {children}
          {inputErrorMessage !== null && !hasHelper && (
            <Field.Helper>{inputErrorMessage}</Field.Helper>
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
 * <DateField required status={errorMessage ? "error" : "default"}>
 *   <DateField.Label>시작일</DateField.Label>
 *   <DateField.Input name="startDate" value={date} onChange={setDate} onInputStateChange={setState} />
 *   <DateField.Helper>{errorMessage ?? "오늘 이후 날짜를 입력해주세요"}</DateField.Helper>
 * </DateField>
 * ```
 */
export const DateField = Object.assign(DateFieldRoot, {
  Label: Field.Label,
  Input: DateFieldInput,
  Helper: DateFieldHelper,
});
