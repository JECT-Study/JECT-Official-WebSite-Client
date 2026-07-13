import type { Dialog } from "radix-ui";
import type { ReactNode } from "react";

import type { BlockButtonProps } from "../Button/BlockButton";
import type { CheckedState } from "../Checkbox";

type BlockButtonActionProps = Pick<
  BlockButtonProps,
  "children" | "onClick" | "disabled" | "hierarchy"
>;

export interface CheckboxActionProps {
  label: ReactNode;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
}

export interface DialogBaseProps {
  header: string;
  body: ReactNode;
  closeOnClickOutside?: boolean;
  checkboxAction?: CheckboxActionProps;
  primaryAction: BlockButtonActionProps;
  secondaryAction?: BlockButtonActionProps;
  container?: HTMLElement | null;
  className?: string;
}

type RadixDialogProps = Omit<Dialog.DialogProps, "children">;

export type DialogProps = DialogBaseProps & RadixDialogProps;
