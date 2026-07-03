import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./chip.css";
import type { ChipProps } from "./chip.types";
import { IconButton } from "../Button/IconButton";
import { Divider } from "../Divider";

import { usePressable } from "@/hooks/usePressable";
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
    const { ref, pressableProps } = usePressable(forwardedRef, {
      disabled,
      elementType: "button",
    });

    const hasValueLabel = Boolean(valueLabel);

    return (
      <span
        className={clsx(styles.root({ activated, disabled }), className)}
        style={style}
        data-disabled={disabled || undefined}
      >
        <button
          ref={ref}
          type={type}
          data-chip-part='content'
          aria-pressed={activated}
          {...pressableProps}
          {...restProps}
          className={clsx(styles.contentButton, pressableProps.className)}
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
