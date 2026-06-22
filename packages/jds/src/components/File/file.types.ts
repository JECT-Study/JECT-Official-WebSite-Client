import type { ComponentPropsWithoutRef, MouseEvent } from "react";

interface BaseFileProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  fileName: string;
  fileSize: string;
  readonly?: boolean;
}

type FileRemovableProps =
  | {
      removable?: false;
      onRemove?: never;
    }
  | {
      removable: true;
      readonly?: false;
      disabled?: false;
      onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
    };

export type FileProps = BaseFileProps & FileRemovableProps;
