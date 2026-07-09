import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./dialog.css";
import type { DialogProps } from "./Dialog.types";
import { BlockButton } from "../Button/BlockButton";
import { Checkbox } from "../Checkbox";

import { getBodyClassName, getTitleClassName } from "@/utils/typography";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isButtonStretched = false,
      header,
      body,
      checkboxAction,
      primaryAction,
      secondaryAction,
      container,
      ...rest
    },
    ref,
  ) => {
    const hasSecondaryButton = !!secondaryAction;
    const isStacked = isButtonStretched && hasSecondaryButton;
    const buttonSize = isButtonStretched ? "lg" : "md";
    const buttonClassName = styles.actionButton({ stretched: isButtonStretched });

    const renderButtons = () => {
      const primary = (
        <BlockButton.Basic
          key='primary'
          size={buttonSize}
          className={buttonClassName}
          {...primaryAction}
        />
      );

      const secondary = secondaryAction ? (
        <BlockButton.Basic
          key='secondary'
          variant='outlined'
          hierarchy='secondary'
          size={buttonSize}
          className={buttonClassName}
          {...secondaryAction}
        />
      ) : null;

      const ordered: (JSX.Element | null)[] = isStacked
        ? [primary, secondary]
        : [secondary, primary];

      return ordered.filter((button): button is JSX.Element => button !== null);
    };

    return (
      <DialogPrimitive.Root {...rest}>
        <DialogPrimitive.Portal container={container}>
          <DialogPrimitive.Overlay className={styles.overlay} />
          <DialogPrimitive.Content ref={ref} className={clsx(styles.content, styles.panel)}>
            <div className={styles.inner}>
              <div className={styles.textGroup}>
                <div className={styles.textWrap}>
                  <DialogPrimitive.Title asChild>
                    <h2 className={clsx(getTitleClassName({ size: "xs" }), styles.title)}>
                      {header}
                    </h2>
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description asChild>
                    <p
                      className={clsx(
                        getBodyClassName({ size: "md", weight: "normal" }),
                        styles.bodyText,
                      )}
                    >
                      {body}
                    </p>
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
              <div className={styles.buttonContainer({ isStacked })}>{renderButtons()}</div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Dialog.displayName = "Dialog";
