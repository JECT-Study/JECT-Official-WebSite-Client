import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface SuggestionFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onHasPopupContentChange: (hasContent: boolean) => void;
}

export const [SuggestionFieldProvider, useSuggestionFieldContext] =
  createCtxProvider<SuggestionFieldContextValue>("SuggestionField");
