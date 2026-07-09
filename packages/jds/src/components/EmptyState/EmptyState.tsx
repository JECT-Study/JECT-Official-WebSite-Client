import { clsx } from "clsx";
import { forwardRef } from "react";

import { emptyStateStyles } from "./emptyState.css";
import type { EmptyStateProps } from "./emptyState.types";
import { BlockButton } from "../Button/BlockButton";
import { Thumbnail } from "../Thumbnail";

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
      className,
      ...rest
    },
    ref,
  ) => {
    const hasPrimary = !!primaryAction;
    const hasSecondary = !!secondaryAction;
    const hasAnyAction = hasPrimary || hasSecondary;
    const hasBothActions = hasPrimary && hasSecondary;

    const actions = hasAnyAction ? (
      <div className={emptyStateStyles.buttonContainer({ hasBothActions })}>
        {hasSecondary && (
          <BlockButton variant='outlined' hierarchy='secondary' size='sm' {...secondaryAction} />
        )}
        {hasPrimary && <BlockButton size='sm' {...primaryAction} />}
      </div>
    ) : null;

    return (
      <div
        ref={ref}
        className={clsx(emptyStateStyles.root({ variant, layout }), className)}
        {...rest}
      >
        {image && (
          <Thumbnail
            appearance='hollow'
            cornerStyle='angular'
            {...image}
            className={clsx(emptyStateStyles.thumbnail, image.className)}
          />
        )}
        <div className={emptyStateStyles.content({ layout })}>
          <span className={emptyStateStyles.header({ layout })}>{header}</span>
          <p className={emptyStateStyles.body({ layout })}>{body}</p>
        </div>
        {actions}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
