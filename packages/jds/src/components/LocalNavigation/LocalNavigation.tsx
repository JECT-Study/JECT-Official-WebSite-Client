import { clsx } from "clsx";
import { IconButton } from "components";
import { forwardRef, useId } from "react";
import { getTitleClassName } from "utils";

import { backButtonSlot, navRoot, navTitle, suffixActionSlot } from "./localNavigation.css";
import type { LocalNavigationProps } from "./localNavigation.types";

export const LocalNavigation = forwardRef<HTMLElement, LocalNavigationProps>(
  (
    {
      title,
      titleAs: TitleTag = "span",
      nested = false,
      floated = false,
      stretched = false,
      onBackClick,
      suffixAction,
      className,
      ...restProps
    },
    ref,
  ) => {
    const titleId = useId();

    return (
      <nav
        ref={ref}
        aria-labelledby={titleId}
        className={clsx(navRoot({ nested, floated, stretched }), className)}
        {...restProps}
      >
        {nested && (
          <div className={backButtonSlot}>
            <IconButton
              icon='arrow-left-line'
              size='xl'
              aria-label='뒤로 가기'
              onClick={onBackClick}
            />
          </div>
        )}
        <TitleTag
          id={titleId}
          className={clsx(getTitleClassName({ size: nested ? "xs" : "md" }), navTitle)}
        >
          {title}
        </TitleTag>
        {suffixAction && <div className={suffixActionSlot}>{suffixAction}</div>}
      </nav>
    );
  },
);

LocalNavigation.displayName = "LocalNavigation";
