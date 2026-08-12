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

    // Helper가 실제로 렌더되는 동안에만 Field가 id를 노출하도록 mount 여부를 알려줘요.
    // 이를 통해 입력 요소가 Helper가 없을 땐 존재하지 않는 id를 참조하지 않아요.
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
          styles.helper({ status, disabled: isDisabled }),
          className,
        )}
      >
        {children}
      </span>
    );
  },
);

FieldHelper.displayName = "Field.Helper";
