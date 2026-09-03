import { Popover } from "radix-ui";
import { forwardRef, useState } from "react";

import { MultiSelectFieldInput } from "./compound/Input";
import { MultiSelectFieldProvider } from "./multiSelectField.context";
import type { MultiSelectFieldProps } from "./multiSelectField.types";
import { Field } from "../Field";

const MultiSelectFieldRoot = forwardRef<HTMLDivElement, MultiSelectFieldProps>((props, ref) => {
  const [isOpenRequested, setIsOpenRequested] = useState(false);
  const [hasPopupContent, setHasPopupContent] = useState(false);

  const isOpen = isOpenRequested && hasPopupContent;

  return (
    <MultiSelectFieldProvider
      isOpen={isOpen}
      onOpenChange={setIsOpenRequested}
      onHasPopupContentChange={setHasPopupContent}
    >
      <Popover.Root open={isOpen} onOpenChange={setIsOpenRequested} modal={false}>
        <Field ref={ref} {...props} />
      </Popover.Root>
    </MultiSelectFieldProvider>
  );
});

MultiSelectFieldRoot.displayName = "MultiSelectField";

export const MultiSelectField = Object.assign(MultiSelectFieldRoot, {
  Label: Field.Label,
  Input: MultiSelectFieldInput,
  Footer: Field.Footer,
  Helper: Field.Helper,
  Counter: Field.Counter,
});
