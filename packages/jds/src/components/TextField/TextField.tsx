import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { Field, type FieldProps } from "../Field";
import * as styles from "./textField.css";
import { useFieldContext } from "../Field/Field.context";

import { getBodyClassName } from "@/utils/typography";

export type TextFieldProps = FieldProps;

/**
 * 루트는 내부 Field primitive 를 그대로 래핑해 status·fieldStyle·readonly·disabled·required 를 전달한다.
 */
const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldProps>(({ ...props }, ref) => {
  return <Field ref={ref} {...props} />;
});

TextFieldRoot.displayName = "TextField";

export type TextFieldInputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "disabled" | "readOnly" | "required"
>;

/**
 * @description Field 컨텍스트를 소비해 Field.Content 안에 놓이는 실제 input.
 * id·disabled·readOnly·required 는 Field 루트가 소유하므로 컨텍스트에서 가져오고,
 * HelperText 가 실제로 렌더될 때만 aria-describedby 로 연결한다.
 * controlled(value·onChange) / uncontrolled(defaultValue) 를 모두 지원한다.
 */
export const Input = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ className, ...restProps }, ref) => {
    const {
      fieldId,
      helperTextId,
      hasHelperText,
      status,
      disabled: isDisabled,
      readonly: isReadonly,
      required: isRequired,
    } = useFieldContext("TextField.Input");

    return (
      <input
        ref={ref}
        id={fieldId}
        aria-describedby={hasHelperText ? helperTextId : undefined}
        aria-invalid={status === "error"}
        disabled={isDisabled}
        readOnly={isReadonly}
        required={isRequired}
        className={clsx(
          getBodyClassName({ size: "md" }),
          styles.input({ disabled: isDisabled, readOnly: isReadonly }),
          className,
        )}
        {...restProps}
      />
    );
  },
);

Input.displayName = "TextField.Input";

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
 *   <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
 * </TextField>
 * ```
 */
export const TextField = Object.assign(TextFieldRoot, {
  Label: Field.Label,
  Content: Field.Content,
  Input,
  HelperText: Field.HelperText,
});
