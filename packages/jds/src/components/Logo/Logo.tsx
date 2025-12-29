import { forwardRef } from "react";

import SvgLogo from "./generated/Logo";
import { StyledLogo } from "./logo.styles";
import type { LogoProps } from "./logo.types";

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  ({ hierarchy = "primary", height = 32, href, tabIndex, ...restProps }, ref) => {
    const isLinkElement = !!href;

    return (
      <StyledLogo
        as={isLinkElement ? "a" : "div"}
        ref={ref}
        href={href}
        $hierarchy={hierarchy}
        $height={height}
        tabIndex={tabIndex}
        {...restProps}
      >
        <SvgLogo width='100%' height='100%' />
      </StyledLogo>
    );
  },
);

Logo.displayName = "Logo";
