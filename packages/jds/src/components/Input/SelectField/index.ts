import { SelectField as SelectFieldBase } from "./SelectField";
import { SelectFieldButton } from "./SelectFieldButton";

export const SelectField = Object.assign(SelectFieldBase, {
  Button: SelectFieldButton,
});

export type { SelectFieldProps, SelectFieldButtonProps } from "./selectField.types";
