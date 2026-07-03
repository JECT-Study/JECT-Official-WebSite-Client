import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";

export interface ChipProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  label: string;
  valueLabel?: string;
  activated?: boolean;
  onRemove: MouseEventHandler<HTMLButtonElement>;
}
