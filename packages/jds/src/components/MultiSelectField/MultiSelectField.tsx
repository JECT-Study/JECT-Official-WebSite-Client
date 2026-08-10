import { Popover } from "radix-ui";
import { forwardRef, useId, useRef, useState } from "react";

import { MultiSelectFieldContent } from "./compound/Content";
import { MultiSelectFieldCounter } from "./compound/Counter";
import { MultiSelectFieldFooter } from "./compound/Footer";
import { MultiSelectFieldInput } from "./compound/Input";
import {
  MultiSelectFieldProvider,
  type MultiSelectFieldValueState,
} from "./MultiSelectField.context";
import type { MultiSelectFieldProps } from "./multiSelectField.types";
import { Field } from "../Field";

const MultiSelectFieldRoot = forwardRef<HTMLDivElement, MultiSelectFieldProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCounter, setHasCounter] = useState(false);
  const [{ valueCount, maxValues }, setValueState] = useState<MultiSelectFieldValueState>({
    valueCount: 0,
  });
  const counterId = useId();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <MultiSelectFieldProvider
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      contentRef={contentRef}
      valueCount={valueCount}
      maxValues={maxValues}
      counterId={counterId}
      hasCounter={hasCounter}
      onCounterMountChange={setHasCounter}
      onValueStateChange={setValueState}
    >
      <Popover.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <Field ref={ref} {...props} />
      </Popover.Root>
    </MultiSelectFieldProvider>
  );
});

MultiSelectFieldRoot.displayName = "MultiSelectField";

export const MultiSelectField = Object.assign(MultiSelectFieldRoot, {
  Label: Field.Label,
  Content: MultiSelectFieldContent,
  Input: MultiSelectFieldInput,
  Footer: MultiSelectFieldFooter,
  HelperText: Field.HelperText,
  Counter: MultiSelectFieldCounter,
});
