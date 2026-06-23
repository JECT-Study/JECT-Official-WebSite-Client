import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./callout.css";
import type { CalloutProps, CalloutSize } from "./callout.types";
import { Icon } from "../Icon";
import type { IconSize } from "../Icon";

import {
  getBodyClassName,
  getLabelClassName,
  getTitleClassName,
  type BodySize,
  type LabelSize,
} from "@/utils/typography";

const iconSizeMap = {
  lg: "lg",
  md: "sm",
  sm: "xs",
  xs: "2xs",
} as const satisfies Record<CalloutSize, IconSize>;

const titleLabelSizeMap = {
  md: "lg",
  sm: "md",
  xs: "sm",
} as const satisfies Record<Exclude<CalloutSize, "lg">, LabelSize>;

const getTitleTypographyClass = (size: CalloutSize) =>
  size === "lg"
    ? getTitleClassName({ size: "xs" })
    : getLabelClassName({ size: titleLabelSizeMap[size], weight: "bold" });

const bodyTypographySizeMap = {
  lg: "lg",
  md: "md",
  sm: "sm",
  xs: "2xs",
} as const satisfies Record<CalloutSize, BodySize>;

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ size = "md", feedback = "none", title, icon, children, className, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root({ size, feedback }), className)}
        {...restProps}
      >
        <div className={styles.content({ size })}>
          {title && (
            <div className={styles.titleWrap({ size })}>
              {icon && (
                <span className={styles.iconContainer}>
                  <Icon
                    aria-hidden
                    className={styles.icon({ feedback })}
                    name={icon}
                    size={iconSizeMap[size]}
                  />
                </span>
              )}
              <p className={clsx(styles.title, getTitleTypographyClass(size))}>{title}</p>
            </div>
          )}
          <p className={clsx(styles.body, getBodyClassName({ size: bodyTypographySizeMap[size] }))}>
            {children}
          </p>
        </div>
      </div>
    );
  },
);

Callout.displayName = "Callout";
