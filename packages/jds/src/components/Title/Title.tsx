import type { ElementRef, ElementType, HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import type { TitleSize, TitleTextAlign } from "./Title.style";
import { StyledTitle } from "./Title.style";

export interface TitleProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: TitleSize;
  textAlign?: TitleTextAlign;
  color?: string;
  children: ReactNode;
}

export const Title = forwardRef<ElementRef<typeof StyledTitle>, TitleProps>(
  ({ as, size = "md", textAlign = "left", color, children, ...props }, ref) => {
    return (
      <StyledTitle as={as} ref={ref} size={size} textAlign={textAlign} color={color} {...props}>
        {children}
      </StyledTitle>
    );
  },
);

Title.displayName = "Title";
