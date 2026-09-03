import { clsx } from "clsx";
import { forwardRef, useLayoutEffect } from "react";

import { useFieldContext } from "../field.context";
import * as styles from "../field.css";
import type { FieldHelperProps } from "../field.types";

import { getLabelClassName } from "@/utils/typography";

export const FieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      helperId,
      onHelperMountChange,
      status,
      disabled: isDisabled,
    } = useFieldContext("Field.Helper");

    useLayoutEffect(() => {
      onHelperMountChange(true);
      return () => onHelperMountChange(false);
    }, [onHelperMountChange]);

    return (
      <span
        {...restProps}
        ref={ref}
        id={helperId}
        className={clsx(
          getLabelClassName({ size: "sm" }),
          styles.belowContent,
          styles.supportText({ status, disabled: isDisabled }),
          className,
        )}
      >
        {children}
      </span>
    );
  },
);

FieldHelper.displayName = "Field.Helper";
