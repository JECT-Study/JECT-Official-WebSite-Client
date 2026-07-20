import { clsx } from "clsx";
import { Dialog as DialogPrimitive } from "radix-ui";
import { forwardRef } from "react";

import * as styles from "./dialog.css";
import type { DialogProps } from "./dialog.types";
import { BlockButton } from "../Button/BlockButton";
import { Checkbox } from "../Checkbox";

import { getBodyClassName, getTitleClassName } from "@/utils/typography";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      header,
      body,
      closeOnClickOutside = true,
      buttonLayout = "horizontal",
      checkboxAction,
      primaryAction,
      secondaryAction,
      container,
      className,
      ...rest
    },
    ref,
  ) => {
    const buttonSize = buttonLayout === "vertical" ? "lg" : "md";

    const primaryButton = <BlockButton size={buttonSize} {...primaryAction} />;
    const secondaryButton = secondaryAction ? (
      <BlockButton
        {...secondaryAction}
        variant='outlined'
        hierarchy='secondary'
        size={buttonSize}
      />
    ) : null;

    return (
      <DialogPrimitive.Root {...rest}>
        <DialogPrimitive.Portal container={container}>
          <DialogPrimitive.Overlay className={styles.overlay} />
          <DialogPrimitive.Content
            ref={ref}
            className={clsx(styles.positioner, styles.panel, className)}
            onPointerDownOutside={closeOnClickOutside ? undefined : event => event.preventDefault()}
          >
            <div className={styles.scrollBody}>
              <div className={styles.textGroup}>
                <DialogPrimitive.Title asChild>
                  <h2 className={clsx(getTitleClassName({ size: "xs" }), styles.title)}>
                    {header}
                  </h2>
                </DialogPrimitive.Title>
                <DialogPrimitive.Description asChild>
                  <div
                    className={clsx(
                      getBodyClassName({ size: "md", weight: "normal" }),
                      styles.bodyText,
                    )}
                  >
                    {body}
                  </div>
                </DialogPrimitive.Description>
              </div>
              {checkboxAction && (
                <Checkbox
                  checked={checkboxAction.checked}
                  onCheckedChange={checkboxAction.onCheckedChange}
                  label={checkboxAction.label}
                />
              )}
            </div>
            <div className={styles.buttonGroup[buttonLayout]}>
              {buttonLayout === "vertical" ? (
                <>
                  {primaryButton}
                  {secondaryButton}
                </>
              ) : (
                <>
                  {secondaryButton}
                  {primaryButton}
                </>
              )}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Dialog.displayName = "Dialog";
