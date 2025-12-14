import { forwardRef } from "react";

import { Radio } from "../Radio";
import type { RadioContentProps } from "./radioContent.types";

const RadioContentLeft = forwardRef<HTMLInputElement, RadioContentProps>(
  (
    {
      radioSize = "md",
      radioStyle = "empty",
      disabled = false,
      subLabelVisible = false,
      subLabel = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Radio.Root radioSize={radioSize} disabled={disabled} align='left' radioStyle={radioStyle}>
        <Radio.Basic ref={ref} {...props} />
        <Radio.Label>{children}</Radio.Label>
        {subLabelVisible && <Radio.SubLabel>{subLabel}</Radio.SubLabel>}
      </Radio.Root>
    );
  },
);

RadioContentLeft.displayName = "RadioContent.Left";

const RadioContentRight = forwardRef<HTMLInputElement, RadioContentProps>(
  (
    {
      radioSize = "md",
      radioStyle = "empty",
      disabled = false,
      subLabelVisible = false,
      subLabel = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Radio.Root radioSize={radioSize} disabled={disabled} align='right' radioStyle={radioStyle}>
        <Radio.Label>{children}</Radio.Label>
        <Radio.Basic ref={ref} {...props} />
        {subLabelVisible && <Radio.SubLabel>{subLabel}</Radio.SubLabel>}
      </Radio.Root>
    );
  },
);

RadioContentRight.displayName = "RadioContent.Right";

export const RadioContent = {
  Left: RadioContentLeft,
  Right: RadioContentRight,
};
