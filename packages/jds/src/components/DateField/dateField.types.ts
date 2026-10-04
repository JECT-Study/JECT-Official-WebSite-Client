import type { ComponentPropsWithoutRef, ReactNode } from "react";

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
  /** 입력 오른쪽에 배치되는 부가 요소 (예: Kbd) */
  suffix?: ReactNode;
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
