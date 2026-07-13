import type { Dialog } from "radix-ui";
import type { ReactNode } from "react";

import type { BlockButtonProps } from "../Button/BlockButton";
import type { CheckedState } from "../Checkbox";

type BlockButtonActionProps = Pick<
  BlockButtonProps,
  "children" | "onClick" | "disabled" | "hierarchy"
>;
type CheckBoxActionProps = {
  label: ReactNode;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
};
type RadixDialogProps = Omit<Dialog.DialogProps, "children">;

type DialogBaseProps = {
  header: string;
  body: ReactNode;
  closeOnClickOutside?: boolean;
  checkboxAction?: CheckBoxActionProps;
  primaryAction: BlockButtonActionProps;
  secondaryAction?: BlockButtonActionProps;
  container?: HTMLElement | null;
};

export type DialogProps = DialogBaseProps & RadixDialogProps;
