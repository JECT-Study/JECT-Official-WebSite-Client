import { useState } from "react";

import { Field, type FieldProps } from "../Field";
import { TextareaContent } from "./compound/Content";
import { TextareaControl } from "./compound/Control";
import { TextareaCounter } from "./compound/Counter";
import { TextareaProvider, type TextareaState } from "./Textarea.context";

export type TextareaProps = FieldProps;

/**
 * 루트는 내부 Field primitive 를 래핑하고, 글자 수 카운터를 위한 값 길이·maxLength 를 추적한다.
 */
const TextareaRoot = ({ children, ...restProps }: TextareaProps) => {
  const [{ valueLength, maxLength }, setControlState] = useState<TextareaState>({
    valueLength: 0,
  });

  return (
    <TextareaProvider
      valueLength={valueLength}
      maxLength={maxLength}
      onControlStateChange={setControlState}
    >
      <Field {...restProps}>{children}</Field>
    </TextareaProvider>
  );
};

TextareaRoot.displayName = "Textarea";

/**
 * @description Field primitive 위에 얹은 공개 compound Textarea (여러 줄 텍스트 입력).
 *
 * @example
 * ```tsx
 * <Textarea status="error" required>
 *   <Textarea.Label>자기소개</Textarea.Label>
 *   <Textarea.Content>
 *     <Textarea.Control maxLength={200} placeholder="내용을 입력하세요" />
 *     <Textarea.Counter />
 *   </Textarea.Content>
 *   <Textarea.HelperText>200자 이내로 입력해주세요</Textarea.HelperText>
 * </Textarea>
 * ```
 */
export const Textarea = Object.assign(TextareaRoot, {
  Label: Field.Label,
  Content: TextareaContent,
  Control: TextareaControl,
  Counter: TextareaCounter,
  HelperText: Field.HelperText,
});
