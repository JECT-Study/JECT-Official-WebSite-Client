import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface TextareaContextValue {
  counter: { current: number; max: number } | null;
  /** Textarea.Control이 글자 수와 maxLength를 보고할 때 호출된다. */
  onCounterChange: (counter: { current: number; max: number } | null) => void;
}

export const [TextareaProvider, useTextareaContext] =
  createCtxProvider<TextareaContextValue>("Textarea");
