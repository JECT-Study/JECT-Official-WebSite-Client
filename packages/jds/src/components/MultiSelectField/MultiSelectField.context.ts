import type { RefObject } from "react";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface MultiSelectFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onHasPopupContentChange: (hasContent: boolean) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  selectedValues: string[];
  toggle: (value: string) => void;
  remove: (value: string) => void;
  maxValues?: number;
  counterId: string;
  hasCounter: boolean;
  onCounterMountChange: (mounted: boolean) => void;
}

export const [MultiSelectFieldProvider, useMultiSelectFieldContext] =
  createCtxProvider<MultiSelectFieldContextValue>("MultiSelectField");
