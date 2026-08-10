import type { RefObject } from "react";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface MultiSelectFieldValueState {
  valueCount: number;
  maxValues?: number;
}

export interface MultiSelectFieldContextValue extends MultiSelectFieldValueState {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  counterId: string;
  hasCounter: boolean;
  onCounterMountChange: (mounted: boolean) => void;
  onValueStateChange: (state: MultiSelectFieldValueState) => void;
}

export const [MultiSelectFieldProvider, useMultiSelectFieldContext] =
  createCtxProvider<MultiSelectFieldContextValue>("MultiSelectField");
