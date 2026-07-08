import type { ComponentPropsWithoutRef } from "react";

import type { BlockButtonProps } from "../Button/BlockButton";
import type { ThumbnailProps } from "../Thumbnail";

type BlockButtonActionProps = Pick<BlockButtonProps, "children" | "onClick" | "disabled">;

export type EmptyStateProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  variant?: "hollow" | "dashed" | "alpha";
  layout?: "vertical" | "horizontal";
  header: string;
  body: string;
  image?: ThumbnailProps;
  primaryAction?: BlockButtonActionProps;
  secondaryAction?: BlockButtonActionProps;
};
