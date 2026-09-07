import type { ComponentPropsWithoutRef, MouseEvent } from "react";

interface BaseFileProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  fileName: string;
  /** 파일 용량 (바이트) */
  fileSize: number;
  /** 용량 표기에 사용할 포매터. 기본값은 `formatFileSize` */
  sizeFormatter?: (bytes: number) => string;
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
      onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
    };

export type FileProps = BaseFileProps & FileRemovableProps;
