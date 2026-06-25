import { forwardRef, type ReactNode } from "react";

import type { CardLayout, CardVariant } from "../Card.types";
import { CardRoot, CardTitle, CardBody } from "../compound";
import * as styles from "../compound/card.css";

interface TitleBodyProps {
  title: string;
  body: ReactNode;
}

export const TitleBody = ({ title, body }: TitleBodyProps) => (
  <div className={styles.contentGroup}>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
  </div>
);

interface PresetFrameProps {
  layout?: CardLayout;
  variant: CardVariant;
  isDisabled?: boolean;
  overlay: ReactNode;
  children: ReactNode;
}

export const PresetFrame = forwardRef<HTMLDivElement, PresetFrameProps>(
  ({ layout, variant, isDisabled, overlay, children }, ref) => (
    <CardRoot ref={ref} layout={layout} variant={variant} isDisabled={isDisabled} interactive>
      {children}
      {overlay}
    </CardRoot>
  ),
);

PresetFrame.displayName = "Card.Preset.Frame";
