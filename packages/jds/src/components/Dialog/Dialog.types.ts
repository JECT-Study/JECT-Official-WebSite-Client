import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import type { RenderableNode } from "types";

import type { BlockButtonBasicProps } from "../Button/BlockButton";
import type { CheckedState } from "../Checkbox";

type BlockButtonActionProps = Pick<
  BlockButtonBasicProps,
  "children" | "onClick" | "disabled" | "hierarchy"
>;
type CheckBoxActionProps = {
  label: RenderableNode;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
};
type RadixDialogProps = Omit<DialogPrimitive.DialogProps, "children">;

type DialogActionOptions =
  | {
      secondaryAction?: undefined;
      tertiaryAction?: never;
    }
  | {
      secondaryAction: BlockButtonActionProps;
      tertiaryAction?: BlockButtonActionProps;
    };

interface DialogBaseProps {
  header: string;
  body: ReactNode;
  isButtonStretched?: boolean;
  checkboxAction?: CheckBoxActionProps;
  primaryAction: BlockButtonActionProps;
}

export type DialogProps = DialogBaseProps & DialogActionOptions & RadixDialogProps;
