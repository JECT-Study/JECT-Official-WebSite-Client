import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

import type { BlockButtonBasicProps } from "../Button/BlockButton";
import type { CheckedState } from "../Checkbox";

type BlockButtonActionProps = Pick<
  BlockButtonBasicProps,
  "children" | "onClick" | "disabled" | "hierarchy"
>;
type CheckBoxActionProps = {
  label: ReactNode;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
};
type RadixDialogProps = Omit<DialogPrimitive.DialogProps, "children">;

type DialogBaseProps = {
  header: string;
  body: ReactNode;
  isButtonStretched?: boolean;
  checkboxAction?: CheckBoxActionProps;
  primaryAction: BlockButtonActionProps;
  secondaryAction?: BlockButtonActionProps;
};

export type DialogProps = DialogBaseProps & RadixDialogProps;
