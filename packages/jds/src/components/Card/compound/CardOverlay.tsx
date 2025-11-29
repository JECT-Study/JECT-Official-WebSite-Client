import { StyledCardOverlay } from "./compound.styles";

import { PolymorphicForwardRef } from "@/utils/forwardRef";

type CardOverlayOwnProps = Record<string, never>;

export const CardOverlay = PolymorphicForwardRef<"a", CardOverlayOwnProps>(
  ({ as, children, ...restProps }, ref) => {
    const Component = as || "a";

    return (
      <StyledCardOverlay as={Component} ref={ref} data-overlay {...restProps}>
        {children}
      </StyledCardOverlay>
    );
  },
);

CardOverlay.displayName = "Card.Overlay";
