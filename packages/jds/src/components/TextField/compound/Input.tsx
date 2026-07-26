import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { useFieldContext } from "../../Field/Field.context";
import * as styles from "../textField.css";

import { getBodyClassName } from "@/utils/typography";

/**
 * `id` 는 Field.Label 의 htmlFor 와 짝을 이뤄야 하므로 컨텍스트의 fieldId 만 사용한다.
 */
export type TextFieldInputProps = Omit<ComponentPropsWithoutRef<"input">, "id">;

/**
 * @description Field 컨텍스트를 소비해 Field.Content 안에 놓이는 실제 input.
 * HelperText 가 실제로 렌더될 때만 aria-describedby 로 연결한다.
 * controlled(value·onChange) / uncontrolled(defaultValue) 를 모두 지원한다.
 */
export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      readOnly: readOnlyFromProps,
      disabled: disabledFromProps,
      required: requiredFromProps,
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

    return (
      <input
        ref={ref}
        id={fieldId}
        aria-describedby={hasHelperText ? helperTextId : undefined}
        aria-invalid={status === "error"}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
        {...restProps}
      />
    );
  },
);

TextFieldInput.displayName = "TextField.Input";
