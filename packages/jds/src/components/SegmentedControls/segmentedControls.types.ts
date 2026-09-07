import type { RadioGroupItemProps, RadioGroupProps } from "@radix-ui/react-radio-group";

export type SegmentedControlsSize = "lg" | "md" | "sm" | "xs";

export interface SegmentedControlsRootProps extends Omit<RadioGroupProps, "asChild"> {
  size?: SegmentedControlsSize;
  asChild?: never;
}

export interface SegmentedControlsItemProps extends Omit<RadioGroupItemProps, "asChild"> {
  asChild?: never;
}
