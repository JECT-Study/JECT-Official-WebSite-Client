import { clsx } from "clsx";
import { Dialog as DialogPrimitive } from "radix-ui";
import { forwardRef } from "react";

import * as styles from "./dialog.css";
import type { DialogProps } from "./Dialog.types";
import { BlockButton } from "../Button/BlockButton";
import { Checkbox } from "../Checkbox";

import { getBodyClassName, getTitleClassName } from "@/utils/typography";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      header,
      body,
      closeOnClickOutside = true,
      checkboxAction,
      primaryAction,
      secondaryAction,
      container,
      ...rest
    },
    ref,
  ) => {
    const secondaryButton = secondaryAction ? (
      <BlockButton variant='outlined' hierarchy='secondary' size='md' {...secondaryAction} />
    ) : null;

    return (
      <DialogPrimitive.Root {...rest}>
        <DialogPrimitive.Portal container={container}>
          <DialogPrimitive.Overlay className={styles.overlay} />
          <DialogPrimitive.Content
            ref={ref}
            className={clsx(styles.content, styles.panel)}
            onPointerDownOutside={closeOnClickOutside ? undefined : event => event.preventDefault()}
          >
            <div className={styles.inner}>
              <div className={styles.textGroup}>
                <div className={styles.textWrap}>
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
                  <Checkbox.Item>
                    <Checkbox.Basic
                      checked={checkboxAction.checked}
                      onCheckedChange={checkboxAction.onCheckedChange}
                    />
                    <Checkbox.Label>{checkboxAction.label}</Checkbox.Label>
                  </Checkbox.Item>
                )}
              </div>
              <div className={styles.buttonContainer}>
                {secondaryButton}
                <BlockButton size='md' {...primaryAction} />
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Dialog.displayName = "Dialog";
