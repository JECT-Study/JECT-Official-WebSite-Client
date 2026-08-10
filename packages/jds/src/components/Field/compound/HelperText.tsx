import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useFieldContext } from "../Field.context";
import * as styles from "../field.css";

import { getLabelClassName } from "@/utils/typography";

export interface FieldHelperTextProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      helperTextId,
      onHelperTextMountChange,
      status,
      fieldStyle,
      disabled: isDisabled,
    } = useFieldContext("Field.HelperText");

    // HelperText가 실제로 렌더되는 동안에만 Field가 id를 노출하도록 mount 여부를 알려줘요.
    // 이를 통해 입력 요소가 HelperText가 없을 땐 존재하지 않는 id를 참조하지 않아요.
    useLayoutEffect(() => {
      onHelperTextMountChange(true);
      return () => onHelperTextMountChange(false);
    }, [onHelperTextMountChange]);

    return (
      <span
        ref={ref}
        id={helperTextId}
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
