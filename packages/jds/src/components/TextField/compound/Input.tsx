import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { FieldContent } from "../../Field";
import { useFieldContext } from "../../Field/Field.context";
import * as styles from "../textField.css";

import { getBodyClassName } from "@/utils/typography";

// prefix는 HTMLAttributes의 RDFa 속성과 타입이 충돌하므로 제외하고 ReactNode로 재정의한다.
export interface TextFieldInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "prefix"
> {
  /** 입력 왼쪽에 배치되는 부가 요소 */
  prefix?: ReactNode;
  /** 입력 오른쪽에 배치되는 부가 요소 */
  suffix?: ReactNode;
}

/**
 * @description Field 컨텍스트를 소비해 필드 박스와 실제 input을 함께 렌더한다.
 * Helper가 실제로 렌더될 때만 aria-describedby로 연결한다.
 * controlled(value, onChange)와 uncontrolled(defaultValue)를 모두 지원한다.
 */
export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      prefix,
      suffix,
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
      <FieldContent>
        {prefix}
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
        {suffix}
      </FieldContent>
    );
  },
);

TextFieldInput.displayName = "TextField.Input";
