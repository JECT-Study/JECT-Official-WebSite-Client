import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { focusRing, overlay, type FocusRingFeedback } from "utils";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";
import type { FieldStatus } from "../field.types";

export interface FieldContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

/**
 * outline: hover/press overlay + focus ring
 * hollow: 인터랙션 레이어 없음 (입력만 노출)
 */
export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      status,
      fieldStyle,
      disabled: isDisabled,
      readonly: isReadonly,
    } = useFieldContext("Field.Content");

    const isOutline = fieldStyle === "outline";

    return (
      <div
        ref={ref}
        className={clsx(
          styles.content({ status, fieldStyle, disabled: isDisabled, readOnly: isReadonly }),
          isOutline && [
            overlay({ hierarchy: "tertiary", density: "normal" }),
            focusRing({ interaction: "within", feedback: statusToFeedback[status] }),
          ],
          className,
        )}
        {...restProps}
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

FieldContent.displayName = "Field.Content";
