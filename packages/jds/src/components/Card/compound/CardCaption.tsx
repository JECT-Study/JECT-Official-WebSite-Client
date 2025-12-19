import { forwardRef } from "react";

import type { CardCaptionProps } from "../Card.types";
import { StyledCardCaption } from "./compound.styles";

export const CardCaption = forwardRef<HTMLSpanElement, CardCaptionProps>(
  ({ children, standalone = false, ...restProps }, ref) => {
    return (
      <StyledCardCaption ref={ref} $standalone={standalone} {...restProps}>
        {children}
      </StyledCardCaption>
    );
  },
);

CardCaption.displayName = "Card.Caption";
