import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldHelperTextProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>(
  ({ children, className, ...restProps }, ref) => {
    const { status, fieldStyle, disabled: isDisabled } = useFieldContext("Field.HelperText");

    return (
      <span
        ref={ref}
        className={clsx(
          getLabelClassName({ size: "sm" }),
          styles.helperText({ status, fieldStyle, disabled: isDisabled }),
          className,
        )}
        {...restProps}
      >
        {children}
      </span>
    );
  },
);

FieldHelperText.displayName = "Field.HelperText";
