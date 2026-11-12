import { forwardRef } from "react";

import { TimeFieldInput } from "./compound/Input";
import type { TimeFieldProps } from "./timeField.types";
import { Field } from "../Field";

const TimeFieldRoot = forwardRef<HTMLDivElement, TimeFieldProps>((props, ref) => (
  <Field ref={ref} {...props} />
));

TimeFieldRoot.displayName = "TimeField";

/**
 * @description 하루 안의 특정 시각을 직접 입력하거나 시간 선택에서 고르는 필드.
 * 오전/오후, 시, 분을 세그먼트 단위로 편집하며 값은 "HH:mm" 형식의 24시간제 문자열이다.
 * 오류 문구와 status, 보여줄 시점은 사용처가 정한다. 오류 종류는 Input의 onInputStateChange로 확인한다.
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
  Helper: Field.Helper,
});
