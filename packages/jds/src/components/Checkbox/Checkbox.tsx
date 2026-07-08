import { forwardRef } from "react";

import type { CheckboxProps } from "./checkbox.types";
import { CheckboxPrimitive } from "./CheckboxPrimitive";

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, helper, size, variant, disabled, isInvalid, ...controlProps }, ref) => {
    if (label == null && helper == null) {
      return (
        <CheckboxPrimitive.Control
          ref={ref}
          size={size}
          disabled={disabled}
          isInvalid={isInvalid}
          {...controlProps}
        />
      );
    }

    return (
      <CheckboxPrimitive.Item size={size} variant={variant} disabled={disabled} isInvalid={isInvalid}>
        <CheckboxPrimitive.Control ref={ref} {...controlProps} />
        {label != null && <CheckboxPrimitive.Label>{label}</CheckboxPrimitive.Label>}
        {helper != null && <CheckboxPrimitive.Helper>{helper}</CheckboxPrimitive.Helper>}
      </CheckboxPrimitive.Item>
    );
  },
);

Checkbox.displayName = "Checkbox";
