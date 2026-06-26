import { forwardRef, type ReactNode } from "react";

import type { CardRootOwnProps } from "../Card.types";
import { useCardContext } from "../cardContext";
import { CardRoot, CardTitle, CardBody } from "../compound";
import * as styles from "../compound/card.css";

interface TitleBodyProps {
  title: string;
  body: ReactNode;
}

export const TitleBody = ({ title, body }: TitleBodyProps) => {
  const { variant } = useCardContext("Card.Preset.TitleBody");

  return (
    <div className={styles.contentGroup({ variant })}>
      <CardTitle>{title}</CardTitle>
      <CardBody>{body}</CardBody>
    </div>
  );
};

interface PresetFrameProps extends CardRootOwnProps {
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
