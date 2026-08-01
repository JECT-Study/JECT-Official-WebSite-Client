import { forwardRef } from "react";

import { SelectFieldTrigger } from "./compound/Trigger";
import type { SelectFieldProps } from "./selectField.types";
import { Field } from "../Field";

const SelectFieldRoot = forwardRef<HTMLDivElement, SelectFieldProps>(({ ...props }, ref) => {
  return <Field ref={ref} {...props} />;
});

SelectFieldRoot.displayName = "SelectField";

export const SelectField = Object.assign(SelectFieldRoot, {
  Label: Field.Label,
  Content: Field.Content,
  Trigger: SelectFieldTrigger,
  HelperText: Field.HelperText,
});
