import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import {
  DialogBodyTextP,
  DialogButton,
  DialogButtonContainerDiv,
  DialogContentDiv,
  DialogDiv,
  DialogRoot,
  DialogTitle,
  DialogOverlay,
  DialogContent,
} from "./Dialog.styles";
import type { DialogProps } from "./Dialog.types";

import { Checkbox } from "@/components";

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
        <DialogButton key='primary' $isButtonStretched={isButtonStretched} {...primaryAction} />
      );

      const secondary = secondaryAction ? (
        <DialogButton
          key='secondary'
          variant='outlined'
          hierarchy='secondary'
          $isButtonStretched={isButtonStretched}
          {...secondaryAction}
        />
      ) : null;

      const tertiary = tertiaryAction ? (
        <DialogButton
          key='tertiary'
          variant='empty'
          hierarchy='tertiary'
          $isButtonStretched={isButtonStretched}
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
                  <DialogTitle size='xs'>{header}</DialogTitle>
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
