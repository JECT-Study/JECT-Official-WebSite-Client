import styled from '@emotion/styled';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { rem, textStyle } from 'utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const StyledButton = styled.button(
  ({ theme }) => `
  display: inline-flex;
  min-width: 28px;
  padding: ${theme.scheme.desktop.spacing[2]}px
    ${theme.scheme.desktop.spacing[6]}px;
  justify-content: center;
  align-items: center;

  border-radius: ${rem(theme.scheme.desktop.radius[4])};
  opacity: ${theme.scheme.desktop.opacity[100]};
  background-color: ${theme.color.feedback.positive.neutral};
  color: ${theme.color.object.static.inverse.boldest};
  text-align: center;

  /* textStyle/label/lg/normal */
  ${textStyle(theme, 'desktop', 'body.2xs.normal')}
`,
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';
