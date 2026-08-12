import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export type SelectFieldProps = FieldProps;

type SelectFieldTriggerBaseProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "id" | "type" | "value" | "defaultValue" | "onChange"
> & {
  options: SelectOption[];
  placeholder?: string;
  /** 읽기 전용 여부. aria-readonly로 반영한다. */
  readonly?: boolean;
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  variant?: OptionVariant;
  /**
   * 값과 화살표 사이에 배치되는 부가 요소.
   *
   * 트리거 버튼 안에 렌더되므로 버튼이나 링크처럼 상호작용하는 요소는 전달하면 안 된다.
   */
  suffix?: ReactNode;
};

type SelectFieldTriggerControlledProps = {
  value: string | null;
  defaultValue?: never;
  onChange: (value: string) => void;
};

type SelectFieldTriggerUncontrolledProps = {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export type SelectFieldTriggerProps = SelectFieldTriggerBaseProps &
  (SelectFieldTriggerControlledProps | SelectFieldTriggerUncontrolledProps);
