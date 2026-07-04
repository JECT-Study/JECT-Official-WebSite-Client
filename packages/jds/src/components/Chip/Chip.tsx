import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./chip.css";
import type { ChipProps } from "./chip.types";
import { IconButton } from "../Button/IconButton";
import { Divider } from "../Divider";

import { getLabelClassName } from "@/utils/typography";

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      valueLabel,
      activated = false,
      disabled = false,
      onRemove,
      className,
      style,
      type = "button",
      ...restProps
    },
    forwardedRef,
  ) => {
    const mainActionRef = useObjectRef(forwardedRef);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { buttonProps, isPressed } = useButton(
      { isDisabled: disabled, elementType: "button" },
      mainActionRef,
    );
    const mainActionProps = mergeProps({ ...buttonProps, onKeyDown: undefined }, focusProps);
    const hasValueLabel = Boolean(valueLabel);

    return (
      <span
        {...hoverProps}
        className={clsx(styles.root({ activated, disabled }), className)}
        style={style}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={disabled || undefined}
      >
        <button
          ref={mainActionRef}
          data-chip-part='content'
          aria-pressed={activated}
          {...mainActionProps}
          type={type}
          {...restProps}
          className={clsx(styles.contentButton, mainActionProps.className)}
        >
          <span className={clsx(styles.label, getLabelClassName({ size: "md" }))}>
            {label}
          </span>
          {hasValueLabel && (
            <>
              <span className={styles.dividerWrapper}>
                <Divider
                  orientation='vertical'
                  decorative
                  variant='solid'
                  className={styles.divider}
                />
              </span>
              <span className={clsx(styles.label, getLabelClassName({ size: "md" }))}>
                {valueLabel}
              </span>
            </>
          )}
        </button>

        <IconButton
          type='button'
          icon='close-line'
          size='xs'
          hierarchy='accent'
          aria-label={`${[label, valueLabel].filter(Boolean).join(" ")} 삭제`}
          disabled={disabled}
          className={styles.closeButton}
          onClick={e => {
            e.stopPropagation();
            onRemove(e);
          }}
        />
      </span>
    );
  },
);

Chip.displayName = "Chip";
