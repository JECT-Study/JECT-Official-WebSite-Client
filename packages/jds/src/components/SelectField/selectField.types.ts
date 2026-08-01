import type { ComponentPropsWithoutRef } from "react";

import type { FieldProps } from "../Field";
import type { SelectOption } from "../Listbox";

export type SelectFieldProps = FieldProps;

export type SelectFieldTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "id" | "type" | "value"
> & {
  options: SelectOption[];
  value?: string | null;
  placeholder?: string;
};
