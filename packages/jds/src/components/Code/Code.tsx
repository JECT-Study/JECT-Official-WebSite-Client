import { StyledCode } from "./Code.styles";
import type { CodeProps } from "./Code.types";

export const Code = ({ children, size = "md", className, ...restProps }: CodeProps) => {
  return (
    <StyledCode $size={size} className={className} {...restProps}>
      {children}
    </StyledCode>
  );
};

Code.displayName = "Code";
