import type { IconName } from "components";

import type { BlockButtonBasicProps } from "../Button/BlockButton";

type EmptyStateStyleVariant = {
  variant?: "empty" | "outlined" | "alpha";
  layout?: "vertical" | "horizontal";
  button?: "primary" | "both";
};

type BlockButtonActionProps = Pick<BlockButtonBasicProps, "children" | "onClick" | "disabled">;

type EmptyStateActionOptions =
  | {
      primaryAction?: undefined;
      secondaryAction?: never;
    }
  | {
      primaryAction: BlockButtonActionProps;
      secondaryAction?: BlockButtonActionProps;
    };

interface EmptyStateBaseProps {
  header: string;
  body: string;
  icon?: IconName;
}

export type EmptyStateProps = EmptyStateStyleVariant &
  EmptyStateBaseProps &
  EmptyStateActionOptions;
