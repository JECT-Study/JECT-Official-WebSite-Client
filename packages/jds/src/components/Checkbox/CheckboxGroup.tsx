import type { CheckboxGroupProps } from "./checkbox.types";
import { CheckboxPrimitive } from "./CheckboxPrimitive";

export const CheckboxGroup = ({ options, ...rootProps }: CheckboxGroupProps) => (
  <CheckboxPrimitive.Root {...rootProps}>
    {options.map(({ value, label, helper, disabled, isInvalid }) => (
      <CheckboxPrimitive.Item key={value} disabled={disabled} isInvalid={isInvalid}>
        <CheckboxPrimitive.Control value={value} />
        <CheckboxPrimitive.Label>{label}</CheckboxPrimitive.Label>
        {helper != null && <CheckboxPrimitive.Helper>{helper}</CheckboxPrimitive.Helper>}
      </CheckboxPrimitive.Item>
    ))}
  </CheckboxPrimitive.Root>
);

CheckboxGroup.displayName = "CheckboxGroup";
