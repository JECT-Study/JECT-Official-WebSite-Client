import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { focusRing, overlay, type FocusRingFeedback } from "utils";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";
import type { FieldStatus } from "../field.types";

export interface FieldContentProps extends ComponentPropsWithoutRef<"div"> {
  /** Overlay 레이어 적용 여부를 관리해요. */
  hasOverlay?: boolean;
  children: ReactNode;
}

export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, hasOverlay: hasOverLayFromProps = true, ...restProps }, ref) => {
    const {
      status,
      fieldStyle,
      disabled: isDisabled,
      readonly: isReadonly,
    } = useFieldContext("Field.Content");

    const hasOutline = fieldStyle === "outline";
    const hasOverlayLayer = hasOverLayFromProps && hasOutline;

    return (
      <div
        ref={ref}
        className={clsx(
          styles.content({ status, fieldStyle, disabled: isDisabled, readOnly: isReadonly }),
          hasOverlayLayer && overlay({ hierarchy: "tertiary", density: "normal" }),
          hasOutline && focusRing({ interaction: "within", feedback: statusToFeedback[status] }),
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
