import { Popover } from "radix-ui";
import { forwardRef, useState } from "react";

import { SuggestionFieldInput } from "./compound/Input";
import { SuggestionFieldProvider } from "./suggestionField.context";
import type { SuggestionFieldProps } from "./suggestionField.types";
import { Field } from "../Field";

const SuggestionFieldRoot = forwardRef<HTMLDivElement, SuggestionFieldProps>((props, ref) => {
  const [isOpenRequested, setIsOpenRequested] = useState(false);
  const [hasPopupContent, setHasPopupContent] = useState(false);

  const isOpen = isOpenRequested && hasPopupContent;

  return (
    <SuggestionFieldProvider
      isOpen={isOpen}
      onOpenChange={setIsOpenRequested}
      onHasPopupContentChange={setHasPopupContent}
    >
      <Popover.Root open={isOpen} onOpenChange={setIsOpenRequested} modal={false}>
        <Field ref={ref} {...props} />
      </Popover.Root>
    </SuggestionFieldProvider>
  );
});

SuggestionFieldRoot.displayName = "SuggestionField";

export const SuggestionField = Object.assign(SuggestionFieldRoot, {
  Label: Field.Label,
  Input: SuggestionFieldInput,
  Footer: Field.Footer,
  Helper: Field.Helper,
  Counter: Field.Counter,
});
