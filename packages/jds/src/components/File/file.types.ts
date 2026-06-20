import type { ComponentPropsWithoutRef, MouseEvent } from "react";

interface BaseFileProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  fileName: string;
  fileSize: string;
  readonly?: boolean;
  disabled?: boolean;
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
