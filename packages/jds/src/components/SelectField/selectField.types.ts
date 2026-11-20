import type { ComponentPropsWithoutRef } from "react";

import type { FieldKbdKeys, FieldProps, FieldStatus } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export interface SelectFieldProps extends Omit<FieldProps, "status"> {
  status?: Exclude<FieldStatus, "success">;
}

interface SelectFieldInputBaseProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  /** 항목 검색 가능 여부 */
  searchable?: boolean;
  variant?: OptionVariant;
  /** 입력과 화살표 사이에 표시하는 단축키. 최대 4개까지 지정할 수 있다. */
  kbd?: FieldKbdKeys;
}

interface SelectFieldInputControlledProps {
  value: string | null;
  defaultValue?: never;
  onChange: (value: string) => void;
}

interface SelectFieldInputUncontrolledProps {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export type SelectFieldInputProps = SelectFieldInputBaseProps &
  (SelectFieldInputControlledProps | SelectFieldInputUncontrolledProps);
