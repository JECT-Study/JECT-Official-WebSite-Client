import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface SelectFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const [SelectFieldProvider, useSelectFieldContext] =
  createCtxProvider<SelectFieldContextValue>("SelectField");
