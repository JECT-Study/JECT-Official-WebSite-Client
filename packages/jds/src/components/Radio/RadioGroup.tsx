import type { RadioGroupProps } from "./radio.types";
import { RadioPrimitive } from "./RadioPrimitive";

export const RadioGroup = ({ options, ...rootProps }: RadioGroupProps) => (
  <RadioPrimitive.Root {...rootProps}>
    {options.map(({ value, label, helper, disabled }) => (
      <RadioPrimitive.Item key={value} value={value} disabled={disabled}>
        <RadioPrimitive.Indicator />
        <RadioPrimitive.Label>{label}</RadioPrimitive.Label>
        {helper != null && <RadioPrimitive.Helper>{helper}</RadioPrimitive.Helper>}
      </RadioPrimitive.Item>
    ))}
  </RadioPrimitive.Root>
);

RadioGroup.displayName = "RadioGroup";
