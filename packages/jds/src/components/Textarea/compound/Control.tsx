import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { useTextLengthCounter } from "../../Field/useFieldCounter";
import * as styles from "../textarea.css";

import { getBodyClassName } from "@/utils/typography";

export interface TextareaControlProps extends Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
}

export const TextareaControl = forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  (
    {
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
    } = useFieldControl("Textarea.Control", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const handleChange = useTextLengthCounter<HTMLTextAreaElement>("Textarea.Control", {
      value,
      defaultValue,
      maxLength,
      onChange,
    });

    return (
      <FieldContent>
        <textarea
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
          aria-required={isRequired || undefined}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-field-control=''
          data-readonly={isReadOnly || undefined}
          className={clsx(getBodyClassName({ size: "md" }), styles.control, className)}
        />
      </FieldContent>
    );
  },
);

TextareaControl.displayName = "Textarea.Control";
