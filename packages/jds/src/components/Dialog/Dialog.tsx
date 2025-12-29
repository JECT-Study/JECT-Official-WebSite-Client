import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import {
  DialogBodyTextP,
  DialogButtonContainerDiv,
  DialogContentDiv,
  DialogDiv,
  DialogRoot,
  DialogTitle,
  DialogOverlay,
  DialogContent,
} from "./Dialog.styles";
import type { DialogProps } from "./Dialog.types";
import { BlockButton } from "../Button/BlockButton";
import { Checkbox } from "../Checkbox";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isButtonStretched = false,
      header,
      body,
      checkboxAction,
      primaryAction,
      secondaryAction,
      tertiaryAction,
      ...rest
    },
    ref,
  ) => {
    const hasTertiaryButton = !!tertiaryAction;
    const isReversedOrder = isButtonStretched && !!tertiaryAction;

    const renderButtons = () => {
      const primary = (
        <BlockButton.Basic
          key='primary'
          style={{ width: isButtonStretched ? "100%" : "auto" }}
          {...primaryAction}
        />
      );

      const secondary = secondaryAction ? (
        <BlockButton.Basic
          key='secondary'
          variant='outlined'
          hierarchy='secondary'
          style={{ width: isButtonStretched ? "100%" : "auto" }}
          {...secondaryAction}
        />
      ) : null;

      const tertiary = tertiaryAction ? (
        <BlockButton.Basic
          key='tertiary'
          variant='empty'
          hierarchy='tertiary'
          style={{ width: isButtonStretched ? "100%" : "auto" }}
          {...tertiaryAction}
        />
      ) : null;

      const ordered: (JSX.Element | null)[] = isReversedOrder
        ? [primary, secondary, tertiary]
        : [tertiary, secondary, primary];

      return ordered.filter(Boolean) as JSX.Element[];
    };

    return (
      <DialogPrimitive.Root {...rest}>
        <DialogPrimitive.Portal>
          <DialogOverlay />
          <DialogContent asChild>
            <DialogRoot ref={ref}>
              <DialogDiv>
                <DialogContentDiv>
                  <DialogTitle textAlign='left' size='xs'>
                    {header}
                  </DialogTitle>
                  <DialogBodyTextP>{body}</DialogBodyTextP>
                  {checkboxAction && <Checkbox.Content {...checkboxAction} />}
                </DialogContentDiv>
                <DialogButtonContainerDiv $isStacked={isButtonStretched && hasTertiaryButton}>
                  {renderButtons()}
                </DialogButtonContainerDiv>
              </DialogDiv>
            </DialogRoot>
          </DialogContent>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Dialog.displayName = "Dialog";
