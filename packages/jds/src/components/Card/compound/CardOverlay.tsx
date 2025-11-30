import { useContext } from "react";

import { CardContext } from "../Card.context";
import { StyledCardOverlay } from "./compound.styles";

import { PolymorphicForwardRef } from "@/utils/forwardRef";

type CardOverlayOwnProps = Record<string, never>;

export const CardOverlay = PolymorphicForwardRef<"a", CardOverlayOwnProps>(
  ({ as, children, ...restProps }, ref) => {
    const Component = as || "a";
    const context = useContext(CardContext);

    if (!context) {
      throw new Error("CardOverlay 는 Card.Root 내부에서 사용되어야 합니다.");
    }

    return (
      <StyledCardOverlay
        as={Component}
        ref={ref}
        data-overlay
        $variant={context.variant}
        $cardStyle={context.cardStyle}
        {...restProps}
      >
        {children}
      </StyledCardOverlay>
    );
  },
);

CardOverlay.displayName = "Card.Overlay";
