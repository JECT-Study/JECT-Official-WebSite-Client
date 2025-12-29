import type { LabelButtonBasicProps, LabelButtonFeedbackProps } from "components";
import { Icon } from "components";
import { forwardRef } from "react";

import { iconSizeMap, StyledLabelButton } from "./labelButton.styles";

const LabelButtonBasic = forwardRef<HTMLButtonElement, LabelButtonBasicProps>(
  (
    {
      children,
      size = "md",
      hierarchy = "primary",
      prefixIcon,
      suffixIcon,
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size];

    return (
      <StyledLabelButton
        ref={ref}
        $hierarchy={hierarchy}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </StyledLabelButton>
    );
  },
);

LabelButtonBasic.displayName = "LabelButton.Basic";

const LabelButtonFeedback = forwardRef<HTMLButtonElement, LabelButtonFeedbackProps>(
  (
    {
      children,
      size = "md",
      intent = "destructive",
      prefixIcon,
      suffixIcon,
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size];

    return (
      <StyledLabelButton
        ref={ref}
        $intent={intent}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </StyledLabelButton>
    );
  },
);

LabelButtonFeedback.displayName = "LabelButton.Feedback";

export const LabelButton = {
  Basic: LabelButtonBasic,
  Feedback: LabelButtonFeedback,
};
