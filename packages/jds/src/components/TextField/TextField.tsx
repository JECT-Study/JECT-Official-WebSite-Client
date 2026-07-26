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

export type TextFieldInputProps = ComponentPropsWithoutRef<"input">;

/**
 * @description Field 컨텍스트를 소비해 Field.Content 안에 놓이는 실제 input.
 * HelperText 가 실제로 렌더될 때만 aria-describedby 로 연결한다.
 * controlled(value·onChange) / uncontrolled(defaultValue) 를 모두 지원한다.
 */
export const Input = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      readOnly: readOnlyFromProps,
      disabled: disabledFromProps,
      required: requiredFromProps,
      id: idFromProps,
      className,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      helperTextId,
      hasHelperText,
      status,
      disabled: isDisabledFromCtx,
      readonly: isReadOnlyFromCtx,
      required: isRequiredFromCtx,
    } = useFieldContext("TextField.Input");

    const isReadOnly = readOnlyFromProps ?? isReadOnlyFromCtx;
    const isDisabled = disabledFromProps ?? isDisabledFromCtx;
    const isRequired = requiredFromProps ?? isRequiredFromCtx;
    const inputId = idFromProps ?? fieldId;

    return (
      <input
        ref={ref}
        id={inputId}
        aria-describedby={hasHelperText ? helperTextId : undefined}
        aria-invalid={status === "error"}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        className={clsx(
          getBodyClassName({ size: "md" }),
          styles.input({ disabled: isDisabled, readOnly: isReadOnly }),
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
