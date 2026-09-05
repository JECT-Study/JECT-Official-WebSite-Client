import { clsx } from "clsx";
import { forwardRef, type MouseEvent } from "react";
import { focusRing, overlay, type FocusRingFeedback } from "utils";

import { useFieldContext } from "../field.context";
import * as styles from "../field.css";
import type { FieldContentProps, FieldStatus } from "../field.types";

export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, className, onMouseDown, ...restProps }, ref) => {
    const { status, disabled: isDisabled, readonly: isReadonly } = useFieldContext("FieldContent");

    // 박스의 패딩을 눌러도 컨트롤이 포커스를 받도록 시각 영역과 클릭 타깃을 맞춘다.
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(e);
      if (e.defaultPrevented || e.target !== e.currentTarget) return;

      const control = e.currentTarget.querySelector<HTMLElement>("[data-field-control]");
      if (control == null) return;

      e.preventDefault();
      control.focus();
    };

    return (
      <div
        {...restProps}
        ref={ref}
        onMouseDown={handleMouseDown}
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
