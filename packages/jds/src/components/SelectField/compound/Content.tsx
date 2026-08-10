import { Popover } from "radix-ui";
import { forwardRef } from "react";

import { Field, type FieldContentProps } from "../../Field";

export const SelectFieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, ...restProps }, ref) => (
    <Popover.Anchor asChild>
      <Field.Content ref={ref} {...restProps}>
        {children}
      </Field.Content>
    </Popover.Anchor>
  ),
);

SelectFieldContent.displayName = "SelectField.Content";
