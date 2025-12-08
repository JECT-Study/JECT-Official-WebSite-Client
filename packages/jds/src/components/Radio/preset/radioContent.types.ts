import type { ChangeEventHandler, ComponentPropsWithoutRef, ReactNode } from "react";

import type { RadioSize } from "../radio.types";

export interface RadioContentProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  radioSize?: RadioSize;
  radioStyle?: "empty" | "outline";
  disabled?: boolean;
  subLabelVisible?: boolean;
  subLabel?: ReactNode;
  children: ReactNode;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultChecked?: boolean;
}
