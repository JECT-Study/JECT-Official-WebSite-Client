import { forwardRef, useState } from "react";

import { TextareaControl } from "./compound/Control";
import { TextareaCounter } from "./compound/Counter";
import { TextareaProvider } from "./Textarea.context";
import { Field, type FieldProps } from "../Field";

export type TextareaProps = FieldProps;

const TextareaRoot = forwardRef<HTMLDivElement, TextareaProps>((props, ref) => {
  const [counter, setCounter] = useState<{ current: number; max: number } | null>(null);

  return (
    <TextareaProvider counter={counter} onCounterChange={setCounter}>
      <Field ref={ref} {...props} />
    </TextareaProvider>
  );
});

TextareaRoot.displayName = "Textarea";

/**
 * @description Field primitive 위에 얹은 공개 compound Textarea.
 *
 * @example
 * ```tsx
 * <Textarea status="error" required>
 *   <Textarea.Label>자기소개</Textarea.Label>
 *   <Textarea.Control maxLength={200} placeholder="내용을 입력하세요" />
 *   <Textarea.Footer>
 *     <Textarea.Helper>200자 이내로 입력해주세요</Textarea.Helper>
 *     <Textarea.Counter />
 *   </Textarea.Footer>
 * </Textarea>
 * ```
 */
export const Textarea = Object.assign(TextareaRoot, {
  Label: Field.Label,
  Control: TextareaControl,
  Footer: Field.Footer,
  Helper: Field.Helper,
  Counter: TextareaCounter,
});
