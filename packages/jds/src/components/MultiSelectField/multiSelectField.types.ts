import type { ComponentPropsWithoutRef } from "react";

import type { FieldKbdKeys, FieldProps, FieldStatus } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export interface MultiSelectFieldProps extends Omit<FieldProps, "status"> {
  status?: Exclude<FieldStatus, "success">;
}

interface MultiSelectFieldInputBaseProps extends Omit<
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
  /** 선택할 수 있는 값의 최대 개수. 지정하면 `MultiSelectField.Counter`가 현재 개수와 함께 표시된다. */
  maxValues?: number;
  /** 입력 오른쪽에 표시하는 단축키. 최대 4개까지 지정할 수 있다. */
  kbd?: FieldKbdKeys;
}

interface MultiSelectFieldInputControlledProps {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
}

interface MultiSelectFieldInputUncontrolledProps {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type MultiSelectFieldInputProps = MultiSelectFieldInputBaseProps &
  (MultiSelectFieldInputControlledProps | MultiSelectFieldInputUncontrolledProps);
