import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { GlobalStyles } from '../../style/globalStyle';
import { rem } from 'utils';
import { lightTheme } from 'theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const StyledButton = styled.button(
  ({ theme: jds }) => `
display: inline-flex;
  min-width: 28px;
  padding: ${jds.scheme.desktop.spacing[2]}px
    ${jds.scheme.desktop.spacing[6]}px;
  justify-content: center;
  align-items: center;

  border-radius: ${rem(jds.scheme.desktop.radius[4])};
  opacity: ${jds.scheme.desktop.opacity[100]};
  background-color: ${jds.color.feedback.positive.neutral};
  color: ${jds.color.object.static.inverse.boldest};
  text-align: center;

  /* textStyle/label/lg/normal */
  font-family: ${jds.typo.desktop.typeface.label};
  font-size: ${jds.typo.desktop.font.size.label.lg}px;
  font-style: normal;
  font-weight: ${jds.typo.desktop.font.weight.label.normal};
  line-height: ${jds.typo.desktop.font.line.height.label.lg}px;
  letter-spacing: ${jds.typo.desktop.font.letter.spacing.label.lg}px;
`,
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <StyledButton ref={ref} {...props}>
        {children}
      </StyledButton>
    </ThemeProvider>
  );
});

Button.displayName = 'Button';
