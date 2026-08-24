import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export type SelectFieldProps = FieldProps;

type SelectFieldInputBaseProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "required"
> & {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  /** 항목 검색 가능 여부 */
  searchable?: boolean;
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
