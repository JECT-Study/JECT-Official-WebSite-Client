import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";

export interface FileProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  fileName: ReactNode;
  fileSize: ReactNode;
  removable?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
}
