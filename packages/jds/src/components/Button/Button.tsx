import styled from '@emotion/styled';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { pxToRem, textStyle } from 'utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const StyledButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  minWidth: 28,
  padding: `${theme.scheme.desktop.spacing[2]}px ${theme.scheme.desktop.spacing[6]}px`,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: pxToRem(theme.scheme.desktop.radius[4]),
  opacity: theme.scheme.desktop.opacity[100],
  backgroundColor: theme.color.feedback.positive.neutral,
  color: theme.color.object.static.inverse.boldest,
  textAlign: 'center',
  ...textStyle(theme, 'desktop', 'body.2xs.normal'),
}));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';
