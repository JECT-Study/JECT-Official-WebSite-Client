import type { Dialog } from "radix-ui";
import type { CSSProperties, ReactNode } from "react";
import type { RenderableNode } from "types";

import type { BlockButtonProps } from "../Button/BlockButton";
import type { CheckedState } from "../Checkbox";

type BlockButtonActionProps = Pick<BlockButtonProps, "children" | "onClick" | "disabled">;

export interface CheckboxActionProps {
  label: RenderableNode;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
}

export type DialogButtonLayout = "horizontal" | "vertical";

export interface DialogBaseProps {
  header: string;
  body: ReactNode;
  closeOnClickOutside?: boolean;
  buttonLayout?: DialogButtonLayout;
  checkboxAction?: CheckboxActionProps;
  primaryAction: BlockButtonActionProps;
  secondaryAction?: BlockButtonActionProps;
  container?: HTMLElement | null;
  className?: string;
  style?: CSSProperties;
}

type RadixDialogProps = Omit<Dialog.DialogProps, "children">;

export type DialogProps = DialogBaseProps & RadixDialogProps;
