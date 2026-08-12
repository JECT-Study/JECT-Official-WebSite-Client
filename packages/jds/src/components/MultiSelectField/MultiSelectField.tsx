import { Popover } from "radix-ui";
import { forwardRef, useRef, useState } from "react";

import { MultiSelectFieldContent } from "./compound/Content";
import { MultiSelectFieldCounter } from "./compound/Counter";
import { MultiSelectFieldFooter } from "./compound/Footer";
import { MultiSelectFieldInput } from "./compound/Input";
import { MultiSelectFieldProvider } from "./MultiSelectField.context";
import type { MultiSelectFieldProps } from "./multiSelectField.types";
import { Field } from "../Field";

const MultiSelectFieldRoot = forwardRef<HTMLDivElement, MultiSelectFieldProps>((props, ref) => {
  const [isOpenRequested, setIsOpenRequested] = useState(false);
  const [hasPopupContent, setHasPopupContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState<{ current: number; max: number } | null>(null);

  const isOpen = isOpenRequested && hasPopupContent;

  return (
    <MultiSelectFieldProvider
      isOpen={isOpen}
      onOpenChange={setIsOpenRequested}
      onHasPopupContentChange={setHasPopupContent}
      contentRef={contentRef}
      counter={counter}
      onCounterChange={setCounter}
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
  Content: MultiSelectFieldContent,
  Input: MultiSelectFieldInput,
  Footer: MultiSelectFieldFooter,
  Helper: Field.Helper,
  Counter: MultiSelectFieldCounter,
});
