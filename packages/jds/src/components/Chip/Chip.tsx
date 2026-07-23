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
      disabled = false,
      onRemove,
      className,
      style,
      type = "button",
      ...restProps
    },
    forwardedRef,
  ) => {
    const valueLabelText = valueLabel?.filter(Boolean).join(", ");
    const isActivated = Boolean(valueLabelText);

    return (
      <span
        className={clsx(styles.root({ activated: isActivated, disabled }), className)}
        style={style}
        data-disabled={disabled || undefined}
      >
        <button
          ref={forwardedRef}
          {...restProps}
          type={type}
          disabled={disabled}
          aria-pressed={isActivated}
          data-interaction-target
          className={styles.mainAction}
        >
          <span className={clsx(styles.label, getLabelClassName({ size: "md" }))}>{label}</span>
          {isActivated && (
            <>
              <span className={styles.dividerWrapper}>
                <Divider orientation='vertical' decorative variant='solid' />
              </span>
              <span className={clsx(styles.valueLabel, getLabelClassName({ size: "md" }))}>
                <span className={styles.valueLabelText}>{valueLabelText}</span>
              </span>
            </>
          )}
        </button>

        <IconButton
          type='button'
          icon='close-line'
          size='xs'
          hierarchy='accent'
          aria-label={`${[label, valueLabelText].filter(Boolean).join(" ")} 제거`}
          disabled={disabled}
          className={styles.removeButton}
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
