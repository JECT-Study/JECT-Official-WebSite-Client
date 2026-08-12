import { Popover } from "radix-ui";
import { forwardRef, useId, useRef, useState } from "react";

import { MultiSelectFieldContent } from "./compound/Content";
import { MultiSelectFieldCounter } from "./compound/Counter";
import { MultiSelectFieldFooter } from "./compound/Footer";
import { MultiSelectFieldInput } from "./compound/Input";
import { MultiSelectFieldProvider } from "./MultiSelectField.context";
import type { MultiSelectFieldProps } from "./multiSelectField.types";
import { Field } from "../Field";
import { useMultiSelectState } from "../Listbox";

const MultiSelectFieldRoot = forwardRef<HTMLDivElement, MultiSelectFieldProps>(
  ({ value, defaultValue, onChange, maxValues, name, form, ...restProps }, ref) => {
    const [isOpenRequested, setIsOpenRequested] = useState(false);
    const [hasPopupContent, setHasPopupContent] = useState(false);
    const [hasCounter, setHasCounter] = useState(false);
    const counterId = useId();
    const contentRef = useRef<HTMLDivElement>(null);

    const { selectedValues, toggle, remove } = useMultiSelectState(value, defaultValue, onChange);

    const isOpen = isOpenRequested && hasPopupContent;

    return (
      <MultiSelectFieldProvider
        isOpen={isOpen}
        onOpenChange={setIsOpenRequested}
        onHasPopupContentChange={setHasPopupContent}
        contentRef={contentRef}
        selectedValues={selectedValues}
        toggle={toggle}
        remove={remove}
        maxValues={maxValues}
        name={name}
        form={form}
        counterId={counterId}
        hasCounter={hasCounter}
        onCounterMountChange={setHasCounter}
      >
        <Popover.Root open={isOpen} onOpenChange={setIsOpenRequested} modal={false}>
          <Field ref={ref} {...restProps} />
        </Popover.Root>
      </MultiSelectFieldProvider>
    );
  },
);

MultiSelectFieldRoot.displayName = "MultiSelectField";

export const MultiSelectField = Object.assign(MultiSelectFieldRoot, {
  Label: Field.Label,
  Content: MultiSelectFieldContent,
  Input: MultiSelectFieldInput,
  Footer: MultiSelectFieldFooter,
  Helper: Field.Helper,
  Counter: MultiSelectFieldCounter,
});
