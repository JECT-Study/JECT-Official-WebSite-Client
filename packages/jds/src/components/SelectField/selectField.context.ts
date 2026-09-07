import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface SelectFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onHasPopupContentChange: (hasContent: boolean) => void;
}

export const [SelectFieldProvider, useSelectFieldContext] =
  createCtxProvider<SelectFieldContextValue>("SelectField");
