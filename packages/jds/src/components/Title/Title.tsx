import type { ComponentProps, ElementRef, ReactNode } from "react";
import { forwardRef } from "react";

import { StyledTitle } from "./Title.style";

export interface TitleProps extends ComponentProps<typeof StyledTitle> {
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
