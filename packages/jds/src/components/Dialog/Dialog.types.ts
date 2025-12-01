import type * as DialogPrimitive from "@radix-ui/react-dialog";

import type { BlockButtonBasicProps } from "../Button/BlockButton";
import type { CheckboxContentProps } from "../Checkbox";

type BlockButtonActionProps = Pick<BlockButtonBasicProps, "children" | "onClick" | "disabled">;
type CheckBoxActionProps = Pick<CheckboxContentProps, "label" | "checked" | "onCheckedChange">;
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
  body: string;
  isButtonStretched?: boolean;
  checkboxAction?: CheckBoxActionProps;
  primaryAction: BlockButtonActionProps;
}

export type DialogProps = DialogBaseProps & DialogActionOptions & RadixDialogProps;
