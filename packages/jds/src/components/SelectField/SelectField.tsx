import { Popover } from "radix-ui";
import { forwardRef, useState } from "react";

import { SelectFieldInput } from "./compound/Input";
import { SelectFieldProvider } from "./selectField.context";
import type { SelectFieldProps } from "./selectField.types";
import { Field } from "../Field";

const SelectFieldRoot = forwardRef<HTMLDivElement, SelectFieldProps>((props, ref) => {
  const [isOpenRequested, setIsOpenRequested] = useState(false);
  const [hasPopupContent, setHasPopupContent] = useState(false);

  const isOpen = isOpenRequested && hasPopupContent;

  return (
    <SelectFieldProvider
      isOpen={isOpen}
      onOpenChange={setIsOpenRequested}
      onHasPopupContentChange={setHasPopupContent}
    >
      <Popover.Root open={isOpen} onOpenChange={setIsOpenRequested} modal={false}>
        <Field ref={ref} {...props} />
      </Popover.Root>
    </SelectFieldProvider>
  );
});

SelectFieldRoot.displayName = "SelectField";

export const SelectField = Object.assign(SelectFieldRoot, {
  Label: Field.Label,
  Input: SelectFieldInput,
  Helper: Field.Helper,
});
