import { forwardRef } from "react";

import { useCardContext } from "../Card.context";
import type { CardLabelProps } from "../Card.types";
import { StyledCardLabel } from "./compound.styles";

export const CardLabel = forwardRef<HTMLHeadingElement, CardLabelProps>(
  ({ children, ...restProps }, ref) => {
    const { variant } = useCardContext();

    return (
      <StyledCardLabel ref={ref} $variant={variant} {...restProps}>
        {children}
      </StyledCardLabel>
    );
  },
);

CardLabel.displayName = "Card.Label";
