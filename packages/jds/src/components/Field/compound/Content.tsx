import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { overlay } from "utils";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

export interface FieldContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      status,
      fieldStyle,
      disabled: isDisabled,
      readonly: isReadonly,
    } = useFieldContext("Field.Content");

    const hasOutline = fieldStyle === "outline";

    return (
      <div
        ref={ref}
        className={clsx(
          styles.content({ status, fieldStyle, disabled: isDisabled, readOnly: isReadonly }),
          hasOutline && overlay({ hierarchy: "tertiary", density: "normal" }),
          className,
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

FieldContent.displayName = "Field.Content";
