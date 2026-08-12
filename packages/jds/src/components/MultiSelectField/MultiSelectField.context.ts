import type { RefObject } from "react";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface MultiSelectFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onHasPopupContentChange: (hasContent: boolean) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  /** MultiSelectField.Input이 보고하는 선택 개수. Counter가 읽는다. */
  counter: { current: number; max: number } | null;
  onCounterChange: (counter: { current: number; max: number } | null) => void;
}

export const [MultiSelectFieldProvider, useMultiSelectFieldContext] =
  createCtxProvider<MultiSelectFieldContextValue>("MultiSelectField");
