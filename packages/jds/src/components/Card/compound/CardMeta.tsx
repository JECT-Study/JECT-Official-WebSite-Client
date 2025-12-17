import { forwardRef } from "react";

import type { CardMetaProps } from "../Card.types";
import { StyledCardMeta } from "./compound.styles";

export const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardMeta ref={ref} {...restProps}>
        {children}
      </StyledCardMeta>
    );
  },
);

CardMeta.displayName = "Card.Meta";
