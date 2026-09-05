import { forwardRef } from "react";

import { Field } from "../Field";
import { TextareaControl } from "./compound/Control";
import type { TextareaProps } from "./textarea.types";

const TextareaRoot = forwardRef<HTMLDivElement, TextareaProps>((props, ref) => {
  return <Field ref={ref} {...props} />;
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
  Counter: Field.Counter,
});
