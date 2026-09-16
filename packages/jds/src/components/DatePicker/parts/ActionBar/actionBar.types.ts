import type { ComponentPropsWithoutRef } from "react";

export type ActionBarProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  "data-part"?: never;
  onToday: () => void;
  onClear: () => void;
  onApply: () => void;
  applyDisabled?: boolean;
};
