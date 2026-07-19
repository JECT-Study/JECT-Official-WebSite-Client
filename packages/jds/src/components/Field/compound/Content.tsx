import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { focusRing, overlay, type FocusRingFeedback } from "utils";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";
import type { FieldStatus } from "../field.types";

export interface FieldContentProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * hover/press overlay 레이어 적용 여부를 관리해요.
   * outline에서만 표시되며, hollow에서는 무시돼요.
   * 이 컴포넌트를 확장하는 필드 종류에 따라 opt-in 해요.
   * (예: Text/Tag/Time/Date는 미사용, Select/File은 사용)
   */
  hasOverlay?: boolean;
  children: ReactNode;
}

export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, hasOverlay = false, ...restProps }, ref) => {
    const {
      status,
      fieldStyle,
      disabled: isDisabled,
      readonly: isReadonly,
    } = useFieldContext("Field.Content");

    const hasFocusRing = fieldStyle === "outline";
    const hasVisibleOverlay = hasOverlay && fieldStyle === "outline";

    return (
      <div
        ref={ref}
        className={clsx(
          styles.content({ status, fieldStyle, disabled: isDisabled, readOnly: isReadonly }),
          hasVisibleOverlay && overlay({ hierarchy: "tertiary", density: "normal" }),
          hasFocusRing && focusRing({ interaction: "within", feedback: statusToFeedback[status] }),
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
