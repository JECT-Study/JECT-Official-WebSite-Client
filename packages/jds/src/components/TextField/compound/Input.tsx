import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { useTextLengthCounter } from "../../Field/useFieldCounter";
import * as styles from "../textField.css";

import { getBodyClassName } from "@/utils/typography";

// prefix는 HTMLAttributes의 RDFa 속성과 타입이 충돌하므로 제외하고 ReactNode로 재정의한다.
export interface TextFieldInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "prefix" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  /** 입력 왼쪽에 배치되는 부가 요소 */
  prefix?: ReactNode;
  /** 입력 오른쪽에 배치되는 부가 요소 */
  suffix?: ReactNode;
}

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      prefix,
      suffix,
      readOnly: readOnlyFromProps,
      disabled: disabledFromProps,
      required: requiredFromProps,
      "aria-label": ariaLabelFromProps,
      "aria-labelledby": labelledByFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      value,
      defaultValue,
      onChange,
      maxLength,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      isDisabled,
      isReadOnly,
      isRequired,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaInvalid,
    } = useFieldControl("TextField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const handleChange = useTextLengthCounter<HTMLInputElement>("TextField.Input", {
      value,
      defaultValue,
      maxLength,
      onChange,
    });

    return (
      <FieldContent>
        {prefix}
        <input
          {...restProps}
          ref={ref}
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired || undefined}
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
