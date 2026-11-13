import { forwardRef, useState } from "react";

import { TimeFieldHelper } from "./compound/Helper";
import { TimeFieldInput } from "./compound/Input";
import { TimeFieldProvider } from "./timeField.context";
import type { TimeFieldProps } from "./timeField.types";
import { Field } from "../Field";

const INPUT_ERROR_MESSAGE = "유효한 시각을 입력해 주세요.";

/**
 * 루트는 내부 Field primitive를 감싸 status, readonly, disabled, required를 전달한다.
 * 시각이 만들어지지 않은 입력(incomplete, invalid)이 보일 때는 사용처의 status와 Helper 문구 대신 TimeField의 문구와 error 상태를 보여 준다.
 * 이때 폼 값은 빈 문자열이라 폼 라이브러리는 필수 오류로 판단하는데, 실제 문제는 잘못 입력한 시각이기 때문이다.
 * 그 밖의 오류 문구와 status는 사용처가 정한다.
 */
const TimeFieldRoot = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ children, status = "default", ...props }, ref) => {
    const [isInputErrorVisible, setIsInputErrorVisible] = useState(false);
    const [hasHelper, setHasHelper] = useState(false);
    const inputErrorMessage = isInputErrorVisible ? INPUT_ERROR_MESSAGE : null;

    return (
      <TimeFieldProvider
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
      </TimeFieldProvider>
    );
  },
);

TimeFieldRoot.displayName = "TimeField";

/**
 * @description 하루 안의 특정 시각을 직접 입력하거나 시간 선택에서 고르는 필드.
 * 오전/오후, 시, 분을 세그먼트 단위로 편집하며 값은 "HH:mm" 형식의 24시간제 문자열이다.
 * 덜 입력한 시각과 없는 시각은 필드를 벗어나거나 폼을 제출하면 TimeField가 문구를 보여 준다.
 * 그 밖의 오류 문구와 status, 보여줄 시점은 사용처가 정한다. 오류 종류는 Input의 onInputStateChange로 확인한다.
 *
 * @example
 * ```tsx
 * <TimeField required status={errorMessage === null ? "default" : "error"}>
 *   <TimeField.Label>시작 시각</TimeField.Label>
 *   <TimeField.Input
 *     name="startTime"
 *     value={time}
 *     onChange={setTime}
 *     onInputStateChange={state => setTimeError(state.error)}
 *   />
 *   <TimeField.Helper>{errorMessage ?? "5분 단위로 입력해 주세요"}</TimeField.Helper>
 * </TimeField>
 * ```
 */
export const TimeField = Object.assign(TimeFieldRoot, {
  Label: Field.Label,
  Input: TimeFieldInput,
  Helper: TimeFieldHelper,
});
