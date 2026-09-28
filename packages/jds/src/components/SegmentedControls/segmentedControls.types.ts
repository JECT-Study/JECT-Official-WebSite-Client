import type { RadioGroup as RadioGroupPrimitive } from "radix-ui";

export type SegmentedControlsSize = "lg" | "md" | "sm" | "xs";

export interface SegmentedControlsRootProps extends Omit<
  RadioGroupPrimitive.RadioGroupProps,
  "asChild"
> {
  size?: SegmentedControlsSize;
  asChild?: never;
}

export interface SegmentedControlsItemProps extends Omit<
  RadioGroupPrimitive.RadioGroupItemProps,
  "asChild"
> {
  asChild?: never;
}
