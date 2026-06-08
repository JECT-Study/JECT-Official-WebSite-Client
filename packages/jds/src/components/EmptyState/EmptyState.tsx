import { forwardRef } from "react";

import {
  EmptyStateLabel,
  EmptyStateRoot,
  EmptyStateBodyTextP,
  EmptyStateContentDiv,
  EmptyStateButtonContainerDiv,
} from "./emptyState.styles";
import type { EmptyStateProps } from "./emptyState.types";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";

import { getLabelClassName } from "@/utils/typography";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant = "empty",
      layout = "vertical",
      header,
      body,
      primaryAction,
      secondaryAction,
      icon,
      ...rest
    },
    ref,
  ) => {
    const hasPrimary = !!primaryAction;
    const hasSecondary = !!secondaryAction;

    const renderActions = () => {
      if (!hasPrimary) return null;

      return (
        <EmptyStateButtonContainerDiv $hasSecondary={hasSecondary}>
          {hasSecondary && (
            <BlockButton.Basic
              variant='outlined'
              hierarchy='secondary'
              size='sm'
              {...secondaryAction}
            />
          )}
          <BlockButton.Basic size='sm' {...primaryAction} />
        </EmptyStateButtonContainerDiv>
      );
    };

    return (
      <EmptyStateRoot ref={ref} $variant={variant} $layout={layout} {...rest}>
        {icon && <Icon name={icon} size='3xl' aria-hidden='true' />}
        <EmptyStateContentDiv $layout={layout}>
          <EmptyStateLabel className={getLabelClassName({ weight: "bold", textAlign: "center" })}>
            {header}
          </EmptyStateLabel>
          <EmptyStateBodyTextP $layout={layout}>{body}</EmptyStateBodyTextP>
        </EmptyStateContentDiv>
        {renderActions()}
      </EmptyStateRoot>
    );
  },
);

EmptyState.displayName = "EmptyState";
