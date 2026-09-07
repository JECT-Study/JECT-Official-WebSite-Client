import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface FileFieldContextValue {
  /** FileField.Input이 보고한 선택된 파일의 용량 (바이트) */
  size: number | null;
  /** FileField.Input이 선택된 파일의 용량을 보고할 때 호출된다. */
  onSizeChange: (size: number | null) => void;
}

export const [FileFieldProvider, useFileFieldContext] =
  createCtxProvider<FileFieldContextValue>("FileField");
