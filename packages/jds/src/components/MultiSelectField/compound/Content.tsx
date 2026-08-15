import { clsx } from "clsx";
import { Popover } from "radix-ui";
import { forwardRef, type MouseEvent } from "react";

import { Field, type FieldContentProps } from "../../Field";
import { useMultiSelectFieldContext } from "../MultiSelectField.context";
import * as styles from "../multiSelectField.css";

import { mergeRefs } from "@/hooks/mergeRefs";

export const MultiSelectFieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, onMouseDown, ...restProps }, ref) => {
    const { onOpenChange, contentRef } = useMultiSelectFieldContext("MultiSelectField.Content");

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(e);
      if (e.defaultPrevented || e.target !== e.currentTarget) return;

      const input = e.currentTarget.querySelector<HTMLInputElement>("input[data-field-control]");
      if (input == null) return;

      e.preventDefault();
      input.focus();
      if (!input.readOnly) onOpenChange(true);
    };

    return (
      <Popover.Anchor asChild>
        <Field.Content
          ref={mergeRefs(ref, contentRef)}
          className={clsx(styles.content, className)}
          onMouseDown={handleMouseDown}
          {...restProps}
        >
          {children}
        </Field.Content>
      </Popover.Anchor>
    );
  },
);

MultiSelectFieldContent.displayName = "MultiSelectField.Content";
