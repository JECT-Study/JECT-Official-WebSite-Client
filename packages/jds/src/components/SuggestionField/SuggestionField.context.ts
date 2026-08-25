import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface SuggestionFieldContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onHasPopupContentChange: (hasContent: boolean) => void;
  /** SuggestionField.Input이 보고하는 선택 개수. Counter가 읽는다. */
  counter: { current: number; max: number } | null;
  onCounterChange: (counter: { current: number; max: number } | null) => void;
}

export const [SuggestionFieldProvider, useSuggestionFieldContext] =
  createCtxProvider<SuggestionFieldContextValue>("SuggestionField");
