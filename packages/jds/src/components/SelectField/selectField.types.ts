import type { ComponentPropsWithoutRef } from "react";

import type { FieldProps } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export type SelectFieldProps = FieldProps;

type SelectFieldTriggerBaseProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "id" | "type" | "value" | "defaultValue" | "onChange"
> & {
  options: SelectOption[];
  placeholder?: string;
  variant?: OptionVariant;
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
