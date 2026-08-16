import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export type MultiSelectFieldProps = FieldProps;

type MultiSelectFieldInputBaseProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "required"
> & {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  variant?: OptionVariant;
  /** 선택할 수 있는 값의 최대 개수. 지정하면 `MultiSelectField.Counter`가 현재 개수와 함께 표시된다. */
  maxValues?: number;
  /** 입력 오른쪽에 형제로 배치되는 부가 요소 */
  suffix?: ReactNode;
};

type MultiSelectFieldInputControlledProps = {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
};

type MultiSelectFieldInputUncontrolledProps = {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type MultiSelectFieldInputProps = MultiSelectFieldInputBaseProps &
  (MultiSelectFieldInputControlledProps | MultiSelectFieldInputUncontrolledProps);
