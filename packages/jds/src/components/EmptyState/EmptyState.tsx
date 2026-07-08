import { clsx } from "clsx";
import { forwardRef } from "react";

import { emptyStateStyles } from "./emptyState.css";
import type { EmptyStateProps } from "./emptyState.types";
import { BlockButton } from "../Button/BlockButton";
import { Thumbnail } from "../Thumbnail";

import { getTitleClassName } from "@/utils/typography";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant = "hollow",
      layout = "vertical",
      header,
      body,
      primaryAction,
      secondaryAction,
      image,
      ...rest
    },
    ref,
  ) => {
    const hasPrimary = !!primaryAction;
    const hasSecondary = !!secondaryAction;
    const hasBothActions = hasPrimary && hasSecondary;

    const renderActions = () => {
      if (!hasPrimary && !hasSecondary) return null;

      return (
        <div className={emptyStateStyles.buttonContainer({ hasBothActions })}>
          {hasSecondary && (
            <BlockButton variant='outlined' hierarchy='secondary' size='sm' {...secondaryAction} />
          )}
          {hasPrimary && <BlockButton size='sm' {...primaryAction} />}
        </div>
      );
    };

    return (
      <div ref={ref} className={emptyStateStyles.root({ variant, layout })} {...rest}>
        {image && (
          <div className={emptyStateStyles.image}>
            <Thumbnail appearance='hollow' cornerStyle='angular' {...image} />
          </div>
        )}
        <div className={emptyStateStyles.content({ layout })}>
          <span
            className={clsx(
              getTitleClassName({
                size: "xs",
                textAlign: layout === "vertical" ? "center" : "left",
              }),
              emptyStateStyles.header,
            )}
          >
            {header}
          </span>
          <p className={emptyStateStyles.body({ layout })}>{body}</p>
        </div>
        {renderActions()}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
