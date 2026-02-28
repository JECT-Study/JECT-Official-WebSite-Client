import { useTheme } from "@emotion/react";

import {
  CalloutContainer,
  CalloutContentDiv,
  CalloutTitleP,
  CalloutContentP,
} from "./Callout.style";
import type { CalloutProps } from "./Callout.types";
import { getCalloutStyleToken, getButtonConfig } from "./Callout.variants";
import { LabelButton } from "../Button/LabelButton";

export const Callout = ({
  size = "md",
  title,
  labelButtonProps,
  children,
  className,
  ...props
}: CalloutProps) => {
  const theme = useTheme();
  const styleToken = getCalloutStyleToken(theme, props);
  const buttonConfig = labelButtonProps && getButtonConfig(props);

  const renderButton = () => {
    if (!buttonConfig || !labelButtonProps) return null;

    if (buttonConfig.variant === "feedback") {
      return (
        <LabelButton.Feedback intent={buttonConfig.intent!} size={size} {...labelButtonProps} />
      );
    }

    return (
      <LabelButton.Basic hierarchy={buttonConfig.hierarchy} size={size} {...labelButtonProps} />
    );
  };

  return (
    <CalloutContainer $size={size} $styleToken={styleToken} className={className}>
      <CalloutContentDiv $size={size}>
        {title && <CalloutTitleP $size={size}>{title}</CalloutTitleP>}
        <CalloutContentP $size={size}>{children}</CalloutContentP>
      </CalloutContentDiv>
      {renderButton()}
    </CalloutContainer>
  );
};
