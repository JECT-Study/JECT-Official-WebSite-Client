import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import type { IconButtonBasicProps, IconButtonFeedbackProps } from "components";
import { forwardRef } from "react";

import { iconButton } from "./iconButton.css";
import { StyledIconButton, getIconSizeForButton } from "./iconButton.styles";
import { Icon } from "../../Icon";

const IconButtonBasic = forwardRef<HTMLButtonElement, IconButtonBasicProps>(
  (
    { icon, size = "md", hierarchy = "primary", disabled = false, className, ...restProps },
    forwardedRef,
  ) => {
    const ref = useObjectRef(forwardedRef);
    const { buttonProps, isPressed } = useButton({ isDisabled: disabled }, ref);
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { focusProps, isFocusVisible } = useFocusRing();
    const iconSize = getIconSizeForButton(size);
    const classes = [iconButton({ hierarchy, size }), className].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        {...mergeProps(buttonProps, hoverProps, focusProps, restProps)}
        className={classes}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={disabled || undefined}
      >
        <Icon name={icon} size={iconSize} />
      </button>
    );
  },
);

IconButtonBasic.displayName = "IconButton.Basic";

const IconButtonFeedback = forwardRef<HTMLButtonElement, IconButtonFeedbackProps>(
  ({ icon, size = "md", intent = "destructive", disabled = false, ...restProps }, ref) => {
    const iconSize = getIconSizeForButton(size);

    return (
      <StyledIconButton
        ref={ref}
        $intent={intent}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        <Icon name={icon} size={iconSize} />
      </StyledIconButton>
    );
  },
);

IconButtonFeedback.displayName = "IconButton.Feedback";

export const IconButton = {
  Basic: IconButtonBasic,
  Feedback: IconButtonFeedback,
};
