import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldHelperProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

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
