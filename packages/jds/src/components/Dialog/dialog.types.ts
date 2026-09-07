import type { Dialog } from "radix-ui";
import type { ReactNode } from "react";
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

/** 포지셔닝과 애니메이션을 컴포넌트가 소유하므로 className/style 대신 조정 축만 prop으로 연다. */
export interface DialogBaseProps {
  header: string;
  body: ReactNode;
  closeOnInteractOutside?: boolean;
  buttonLayout?: DialogButtonLayout;
  checkboxAction?: CheckboxActionProps;
  primaryAction: BlockButtonActionProps;
  secondaryAction?: BlockButtonActionProps;
  container?: HTMLElement | null;
  /** px 단위 너비 고정. 없으면 400~560px 사이에서 내용에 맞춰 정해진다. */
  width?: number;
}

type RadixDialogProps = Omit<Dialog.DialogProps, "children">;

export type DialogProps = DialogBaseProps & RadixDialogProps;
