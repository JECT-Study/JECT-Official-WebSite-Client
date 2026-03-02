import { StyledKbd } from "./Kbd.style";
import type { KbdProps } from "./Kbd.types";

export const Kbd = ({
  children,
  size = "md",
  type = "key",
  muted = false,
  className,
  ...restProps
}: KbdProps) => {
  return (
    <StyledKbd $size={size} $type={type} $isMuted={muted} className={className} {...restProps}>
      {children}
    </StyledKbd>
  );
};

Kbd.displayName = "Kbd";
