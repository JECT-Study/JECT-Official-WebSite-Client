import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { useFieldContext } from "../../Field/Field.context";
import * as styles from "../textField.css";

import { getBodyClassName } from "@/utils/typography";

export type TextFieldInputProps = Omit<ComponentPropsWithoutRef<"input">, "id">;

/**
 * @description Field 컨텍스트를 소비해 Field.Content 안에 놓이는 실제 input.
 * Helper가 실제로 렌더될 때만 aria-describedby로 연결한다.
 * controlled(value, onChange)와 uncontrolled(defaultValue)를 모두 지원한다.
 */
export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      readOnly: readOnlyFromProps,
      disabled: disabledFromProps,
      required: requiredFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      helperId,
      hasHelper,
      status,
      disabled: isDisabledFromCtx,
      readonly: isReadOnlyFromCtx,
      required: isRequiredFromCtx,
    } = useFieldContext("TextField.Input");

    const isReadOnly = readOnlyFromProps ?? isReadOnlyFromCtx;
    const isDisabled = disabledFromProps ?? isDisabledFromCtx;
    const isRequired = requiredFromProps ?? isRequiredFromCtx;

    const describedByIds = [hasHelper ? helperId : undefined, describedByFromProps].filter(Boolean);
    const ariaInvalid = status === "error" ? true : (invalidFromProps ?? false);

    return (
      <input
        {...restProps}
        ref={ref}
        id={fieldId}
        aria-describedby={describedByIds.length > 0 ? describedByIds.join(" ") : undefined}
        aria-invalid={ariaInvalid}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        data-field-control=''
        // native :read-only는 readonly를 지원하지 않는 input type에서도 매칭되므로, 해석된 상태를 data 속성으로 내려준다.
        data-readonly={isReadOnly || undefined}
        className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
      />
    );
  },
);

TextFieldInput.displayName = "TextField.Input";
