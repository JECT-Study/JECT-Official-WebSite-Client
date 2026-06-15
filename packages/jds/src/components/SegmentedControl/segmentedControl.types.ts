import type { RadioGroupItemProps, RadioGroupProps } from "@radix-ui/react-radio-group";

export type SegmentedControlSize = "lg" | "md" | "sm" | "xs";

export interface SegmentedControlRootProps extends Omit<RadioGroupProps, "asChild"> {
  size?: SegmentedControlSize;
  asChild?: never;
}

export type SegmentedControlItemProps = Omit<RadioGroupItemProps, "asChild"> & {
  asChild?: never;
};
