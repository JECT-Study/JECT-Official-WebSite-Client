import { forwardRef } from "react";

import { Field, type FieldProps } from "../Field";
import { TextFieldInput } from "./compound/Input";

export type TextFieldProps = FieldProps;

/**
 * 루트는 내부 Field primitive를 그대로 감싸 status, readonly, disabled, required를 전달한다.
 */
const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  return <Field ref={ref} {...props} />;
});

TextFieldRoot.displayName = "TextField";

/**
 * @description Field primitive 위에 얹은 공개 compound TextField.
 *
 * @example
 * ```tsx
 * <TextField status="error" required>
 *   <TextField.Label>이메일</TextField.Label>
 *   <TextField.Content>
 *     <TextField.Input placeholder="이메일을 입력하세요" value={v} onChange={onChange} />
 *   </TextField.Content>
 *   <TextField.Helper>유효한 이메일 주소를 입력해주세요</TextField.Helper>
 * </TextField>
 * ```
 */
export const TextField = Object.assign(TextFieldRoot, {
  Label: Field.Label,
  Content: Field.Content,
  Input: TextFieldInput,
  Helper: Field.Helper,
});
