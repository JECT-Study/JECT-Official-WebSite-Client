import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { DatePickerProps } from "../DatePicker";
import type { FieldProps } from "../Field";

export type DateFieldProps = FieldProps;

interface DateFieldInputBaseProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  | "id"
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "prefix"
  | "required"
  | "placeholder"
  | "inputMode"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  /** 달력 버튼 오른쪽에 배치되는 부가 요소 (예: Kbd) */
  suffix?: ReactNode;
  /**
   * @description 달력 버튼 표시 여부. 끄면 직접 입력만 할 수 있다.
   * @default true
   */
  withPicker?: boolean;
  /** 달력에서 선택할 수 있는 가장 이른 날짜. 직접 입력한 값은 제한하지 않는다. */
  minDate?: DatePickerProps["minDate"];
  /** 달력에서 선택할 수 있는 가장 늦은 날짜. 직접 입력한 값은 제한하지 않는다. */
  maxDate?: DatePickerProps["maxDate"];
  /** 날짜마다 호출되며, true를 반환한 날짜는 달력에서 선택할 수 없다. */
  isDateDisabled?: DatePickerProps["isDateDisabled"];
}

interface DateFieldInputControlledProps {
  /** "YYYY-MM-DD" 형식의 값. 입력이 완성되지 않았으면 빈 문자열이다. */
  value: string;
  defaultValue?: never;
  onChange: (value: string) => void;
}

interface DateFieldInputUncontrolledProps {
  value?: never;
  /** "YYYY-MM-DD" 형식의 값 */
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export type DateFieldInputProps = DateFieldInputBaseProps &
  (DateFieldInputControlledProps | DateFieldInputUncontrolledProps);
