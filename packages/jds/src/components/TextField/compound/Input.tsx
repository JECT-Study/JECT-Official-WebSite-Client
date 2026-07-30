import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { useFieldContext } from "../../Field/Field.context";
import * as styles from "../textField.css";

import { getBodyClassName } from "@/utils/typography";

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
      "aria-describedby": describedByFromProps,
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

    const describedByIds = [hasHelperText ? helperTextId : undefined, describedByFromProps].filter(
      Boolean,
    );

    return (
      <input
        {...restProps}
        ref={ref}
        id={fieldId}
        aria-describedby={describedByIds.length > 0 ? describedByIds.join(" ") : undefined}
        aria-invalid={status === "error"}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        // NOTES: :read-only 는 readonly 가 적용되지 않는 type(checkbox·range·file 등)에서도 항상 매칭되므로 스타일은 실제로 해석된 readonly 상태를 담은 data 속성으로 건다.
        data-readonly={isReadOnly || undefined}
        className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
      />
    );
  },
);

TextFieldInput.displayName = "TextField.Input";
