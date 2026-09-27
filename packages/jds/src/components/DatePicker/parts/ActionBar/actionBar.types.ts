import type { ComponentPropsWithoutRef } from "react";

export interface ActionBarProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  "data-part"?: never;
  onToday: () => void;
  onClear: () => void;
  onApply: () => void;
  applyDisabled?: boolean;
}
