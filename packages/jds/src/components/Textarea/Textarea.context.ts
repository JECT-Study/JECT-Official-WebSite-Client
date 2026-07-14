import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface TextareaState {
  valueLength: number;
  maxLength?: number;
}

export interface TextareaContextValue extends TextareaState {
  /** Textarea.Control이 값 길이·maxLength를 보고할 때 호출돼요. */
  onControlStateChange: (state: TextareaState) => void;
}

export const [TextareaProvider, useTextareaContext] =
  createCtxProvider<TextareaContextValue>("Textarea");
