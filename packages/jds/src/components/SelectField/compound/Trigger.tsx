import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldContext } from "../../Field/Field.context";
import { Icon } from "../../Icon";
import * as styles from "../selectField.css";
import type { SelectFieldTriggerProps } from "../selectField.types";

import { getBodyClassName } from "@/utils/typography";

export const SelectFieldTrigger = forwardRef<HTMLButtonElement, SelectFieldTriggerProps>(
  (
    {
      options,
      value,
      placeholder,
      disabled: disabledFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
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
      readonly: isReadOnly,
    } = useFieldContext("SelectField.Trigger");

    const isDisabled = disabledFromProps ?? isDisabledFromCtx;
    const selectedLabel = options.find(option => option.value === value)?.label;

    const describedByIds = [hasHelperText ? helperTextId : undefined, describedByFromProps].filter(
      Boolean,
    );
    const ariaInvalid = status === "error" ? true : (invalidFromProps ?? false);

    return (
      <button
        {...restProps}
        ref={ref}
        type='button'
        id={fieldId}
        aria-describedby={describedByIds.length > 0 ? describedByIds.join(" ") : undefined}
        aria-invalid={ariaInvalid}
        disabled={isDisabled}
        data-readonly={isReadOnly || undefined}
        className={clsx(styles.trigger, className)}
      >
        <span
          className={clsx(getBodyClassName({ size: "md" }), styles.value)}
          data-placeholder={selectedLabel == null || undefined}
        >
          {selectedLabel ?? placeholder}
        </span>
        <Icon name='arrow-down-s-line' size='sm' className={styles.indicator} />
      </button>
    );
  },
);

SelectFieldTrigger.displayName = "SelectField.Trigger";
