import { forwardRef } from "react";

import { useCardContext } from "../Card.context";
import type { CardContentProps } from "../Card.types";
import { StyledCardContent } from "./compound.styles";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...restProps }, ref) => {
    const { variant, layout } = useCardContext();

    return (
      <StyledCardContent ref={ref} $variant={variant} $layout={layout} {...restProps}>
        {children}
      </StyledCardContent>
    );
  },
);

CardContent.displayName = "Card.Content";
