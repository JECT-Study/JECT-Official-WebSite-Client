import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export type SelectFieldProps = FieldProps;

type SelectFieldInputBaseProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "required"
> & {
  options: SelectOption[];
  placeholder?: string;
  /** 읽기 전용 여부. aria-readonly로 반영한다. */
  readOnly?: boolean;
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  variant?: OptionVariant;
  /** 입력 오른쪽에 형제로 배치되는 부가 요소 */
  suffix?: ReactNode;
};

type SelectFieldInputControlledProps = {
  value: string | null;
  defaultValue?: never;
  onChange: (value: string) => void;
};

type SelectFieldInputUncontrolledProps = {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export type SelectFieldInputProps = SelectFieldInputBaseProps &
  (SelectFieldInputControlledProps | SelectFieldInputUncontrolledProps);
