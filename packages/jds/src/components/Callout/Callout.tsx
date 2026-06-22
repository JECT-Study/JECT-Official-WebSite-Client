import { clsx } from "clsx";

import * as styles from "./Callout.css";
import type { CalloutProps, CalloutSize } from "./Callout.types";
import { Icon } from "../Icon";
import type { IconSize } from "../Icon";

const iconSizeMap = {
  lg: "lg",
  md: "sm",
  sm: "xs",
  xs: "2xs",
} as const satisfies Record<CalloutSize, IconSize>;

export const Callout = ({
  size = "md",
  feedback = "none",
  title,
  icon,
  children,
  className,
}: CalloutProps) => {
  return (
    <div className={clsx(styles.root({ size, feedback }), className)}>
      <div className={styles.adjustmentLayer({ feedback })} aria-hidden />
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
            <p className={styles.title({ size })}>{title}</p>
          </div>
        )}
        <p className={styles.body({ size })}>{children}</p>
      </div>
    </div>
  );
};
