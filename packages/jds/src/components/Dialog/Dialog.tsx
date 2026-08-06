import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { Dialog as DialogPrimitive } from "radix-ui";
import { forwardRef } from "react";

import * as styles from "./dialog.css";
import type { DialogProps } from "./dialog.types";
import { BlockButton } from "../Button/BlockButton";
import { Checkbox } from "../Checkbox";

import { useVerticalOverflow } from "@/hooks/useVerticalOverflow";
import { pxToRem } from "@/utils/cssUnit";
import { getBodyClassName, getTitleClassName } from "@/utils/typography";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      header,
      body,
      closeOnInteractOutside = true,
      buttonLayout = "horizontal",
      checkboxAction,
      primaryAction,
      secondaryAction,
      container,
      width,
      ...rest
    },
    ref,
  ) => {
    const { ref: scrollBodyRef, isOverflowing: isScrollBodyOverflowing } =
      useVerticalOverflow<HTMLDivElement>();

    const panelStyle =
      width == null ? undefined : assignInlineVars({ [styles.dialogPanelWidth]: pxToRem(width) });

    const buttonSize = buttonLayout === "vertical" ? "lg" : "md";

    const primaryButton = <BlockButton {...primaryAction} size={buttonSize} />;
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
            className={clsx(styles.positioner, styles.panel)}
            style={panelStyle}
            onInteractOutside={closeOnInteractOutside ? undefined : event => event.preventDefault()}
          >
            <DialogPrimitive.Title asChild>
              <h2 className={clsx(getTitleClassName({ size: "xs" }), styles.title)}>{header}</h2>
            </DialogPrimitive.Title>
            <div className={styles.scrollRegion}>
              <div
                ref={scrollBodyRef}
                className={styles.scrollBody}
                tabIndex={isScrollBodyOverflowing ? 0 : undefined}
                data-interaction-target
              >
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
            </div>
            <div className={styles.footer}>
              {checkboxAction && (
                <Checkbox
                  checked={checkboxAction.checked}
                  onCheckedChange={checkboxAction.onCheckedChange}
                  label={checkboxAction.label}
                />
              )}
              <div className={styles.buttonGroup({ buttonLayout })}>
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
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Dialog.displayName = "Dialog";
