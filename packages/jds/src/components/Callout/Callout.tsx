import { useTheme } from "@emotion/react";

import {
  CalloutContainer,
  CalloutContentDiv,
  CalloutTitleP,
  CalloutContentP,
} from "./Callout.style";
import type { CalloutProps } from "./Callout.types";
import { getCalloutStyleToken } from "./Callout.variants";
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

  const renderButton = () => {
    if (!labelButtonProps) return null;

    if (props.feedback) {
      return <LabelButton.Basic hierarchy='secondary' size={size} {...labelButtonProps} />;
    }

    return (
      <LabelButton.Basic
        hierarchy={props.hierarchy || "secondary"}
        size={size}
        {...labelButtonProps}
      />
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
