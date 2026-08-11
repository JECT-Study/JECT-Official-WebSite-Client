import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";
import type { OptionVariant } from "../Listbox";

type MultiSelectFieldBaseProps = Omit<FieldProps, "value" | "defaultValue" | "onChange"> & {
  /** 선택할 수 있는 값의 최대 개수입니다. 지정하면 `MultiSelectField.Counter`가 현재 개수와 함께 표시됩니다. */
  maxValues?: number;
  /** 지정하면 선택값마다 hidden input을 렌더해 폼 제출에 포함시킵니다. */
  name?: string;
  form?: string;
};

type MultiSelectFieldControlledProps = {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
};

type MultiSelectFieldUncontrolledProps = {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type MultiSelectFieldProps = MultiSelectFieldBaseProps &
  (MultiSelectFieldControlledProps | MultiSelectFieldUncontrolledProps);

export type MultiSelectFieldInputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "name" | "form"
> & {
  options: string[];
  placeholder?: string;
  variant?: OptionVariant;
  /** 입력값이 기존 옵션이나 현재 선택값과 겹치지 않을 때 목록에 새 값 추가 항목을 표시합니다. */
  allowCustomValue?: boolean;
  /** 입력 오른쪽에 형제로 배치되는 부가 요소입니다. */
  suffix?: ReactNode;
};
