import { Children, forwardRef, isValidElement, type ReactNode } from "react";

import { useCardContext } from "../Card.context";
import type { CardContentProps } from "../Card.types";
import { StyledCardContent, StyledContentMain } from "./compound.styles";

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
  ({ children, ...restProps }, ref) => {
    const { variant, layout } = useCardContext();
    const childrenArray = Children.toArray(children);

    const mainContentNodes: ReactNode[] = [];
    const metaNodes: ReactNode[] = [];

    childrenArray.forEach(child => {
      if (isTargetComponent(child, ["Card.Caption", "Card.Meta"])) metaNodes.push(child);
      else mainContentNodes.push(child);
    });

    return (
      <StyledCardContent ref={ref} $variant={variant} $layout={layout} {...restProps}>
        {mainContentNodes.length > 0 && <StyledContentMain>{mainContentNodes}</StyledContentMain>}
        {metaNodes.length > 0 && <StyledContentMain>{metaNodes}</StyledContentMain>}
      </StyledCardContent>
    );
  },
);

CardContent.displayName = "Card.Content";
