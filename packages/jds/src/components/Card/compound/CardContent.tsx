import { clsx } from "clsx";
import { Children, forwardRef, isValidElement, type ReactNode } from "react";

import { useCardContext } from "../Card.context";
import type { CardContentProps } from "../Card.types";
import * as styles from "./compound.css";

interface ComponentWithDisplayName {
  displayName?: string;
}

const isTargetComponent = (child: ReactNode, targetNames: string[]): boolean => {
  if (!isValidElement(child)) return false;

  const type = child.type;
  const componentType = type as ComponentWithDisplayName;

  if (typeof type === "string") return false;

  return targetNames.includes(componentType.displayName || "");
};

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { variant, layout } = useCardContext();
    const childrenArray = Children.toArray(children);

    const mainContentNodes: ReactNode[] = [];
    const metaNodes: ReactNode[] = [];

    childrenArray.forEach(child => {
      if (isTargetComponent(child, ["Card.Caption", "Card.Meta"])) metaNodes.push(child);
      else mainContentNodes.push(child);
    });

    return (
      <div
        ref={ref}
        className={clsx(styles.content({ variant, layout }), className)}
        {...restProps}
      >
        {mainContentNodes.length > 0 && (
          <div className={styles.contentGroup}>{mainContentNodes}</div>
        )}
        {metaNodes.length > 0 && <div className={styles.contentGroup}>{metaNodes}</div>}
      </div>
    );
  },
);

CardContent.displayName = "Card.Content";
