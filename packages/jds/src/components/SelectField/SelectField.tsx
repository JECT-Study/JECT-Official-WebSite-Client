import { Popover } from "radix-ui";
import { forwardRef, useState } from "react";

import { SelectFieldContent } from "./compound/Content";
import { SelectFieldTrigger } from "./compound/Trigger";
import { SelectFieldProvider } from "./SelectField.context";
import type { SelectFieldProps } from "./selectField.types";
import { Field } from "../Field";

const SelectFieldRoot = forwardRef<HTMLDivElement, SelectFieldProps>(({ ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectFieldProvider isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <Field ref={ref} {...props} />
      </Popover.Root>
    </SelectFieldProvider>
  );
});

SelectFieldRoot.displayName = "SelectField";

export const SelectField = Object.assign(SelectFieldRoot, {
  Label: Field.Label,
  Content: SelectFieldContent,
  Trigger: SelectFieldTrigger,
  HelperText: Field.HelperText,
});
