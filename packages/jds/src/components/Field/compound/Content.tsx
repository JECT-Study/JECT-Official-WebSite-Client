import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { focusRing, overlay, type FocusRingFeedback } from "utils";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";
import type { FieldStatus } from "../field.types";

export interface FieldContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { status, disabled: isDisabled, readonly: isReadonly } = useFieldContext("FieldContent");

    return (
      <div
        {...restProps}
        ref={ref}
        className={clsx(
          styles.content({ status, disabled: isDisabled, readOnly: isReadonly }),
          overlay({ hierarchy: "tertiary", density: "normal" }),
          focusRing({ interaction: "within", feedback: statusToFeedback[status] }),
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

const statusToFeedback = {
  default: "none",
  success: "positive",
  error: "destructive",
} satisfies Record<FieldStatus, FocusRingFeedback>;

FieldContent.displayName = "FieldContent";
