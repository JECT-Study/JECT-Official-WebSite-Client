import { forwardRef } from "react";

import { DateFieldInput } from "./compound/Input";
import type { DateFieldProps } from "./dateField.types";
import { Field } from "../Field";

/**
 * 루트는 내부 Field primitive를 그대로 감싸 status, readonly, disabled, required를 전달한다.
 * 오류 문구와 status는 사용처가 정한다. Input은 오류 종류와 표시 시점만 onInputStateChange로 알린다.
 */
const DateFieldRoot = forwardRef<HTMLDivElement, DateFieldProps>((props, ref) => {
  return <Field ref={ref} {...props} />;
});

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
  Helper: Field.Helper,
});
