import { clsx } from "clsx";
import { forwardRef } from "react";

import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { useTextLengthCounter } from "../../Field/useFieldCounter";
import * as styles from "../textField.css";
import type { TextFieldInputProps } from "../textField.types";

import { getBodyClassName } from "@/utils/typography";

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
