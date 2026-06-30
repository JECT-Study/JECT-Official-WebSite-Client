import { forwardRef, type ReactNode } from "react";

import type { CardRootProps } from "../Card.types";
import { CardRoot, CardContentGroup, CardTitle, CardBody } from "../compound";

interface TitleBodyProps {
  title: string;
  body: ReactNode;
}

export const TitleBody = ({ title, body }: TitleBodyProps) => (
  <CardContentGroup>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
  </CardContentGroup>
);

interface PresetFrameProps extends CardRootProps {
  overlay: ReactNode;
}

export const PresetFrame = forwardRef<HTMLDivElement, PresetFrameProps>(
  ({ overlay, children, ...rootProps }, ref) => (
    <CardRoot ref={ref} {...rootProps} interactive>
      {children}
      {overlay}
    </CardRoot>
  ),
);

PresetFrame.displayName = "Card.Preset.Frame";
