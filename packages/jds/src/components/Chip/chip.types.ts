import type { ComponentPropsWithoutRef, MouseEvent } from "react";

export interface ChipProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  label: string;
  valueLabel?: string[];
  valueLabelOnly?: boolean;
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
}
