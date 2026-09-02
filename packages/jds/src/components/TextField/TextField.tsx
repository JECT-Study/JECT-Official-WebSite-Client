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
 *   <TextField.Label>닉네임</TextField.Label>
 *   <TextField.Input maxLength={10} placeholder="닉네임을 입력하세요" value={v} onChange={onChange} />
 *   <TextField.Footer>
 *     <TextField.Helper>10자 이내로 입력해주세요</TextField.Helper>
 *     <TextField.Counter />
 *   </TextField.Footer>
 * </TextField>
 * ```
 */
export const TextField = Object.assign(TextFieldRoot, {
  Label: Field.Label,
  Input: TextFieldInput,
  Footer: Field.Footer,
  Helper: Field.Helper,
  Counter: Field.Counter,
});
