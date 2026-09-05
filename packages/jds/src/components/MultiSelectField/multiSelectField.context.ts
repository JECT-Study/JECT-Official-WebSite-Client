import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface MultiSelectFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onHasPopupContentChange: (hasContent: boolean) => void;
}

export const [MultiSelectFieldProvider, useMultiSelectFieldContext] =
  createCtxProvider<MultiSelectFieldContextValue>("MultiSelectField");
