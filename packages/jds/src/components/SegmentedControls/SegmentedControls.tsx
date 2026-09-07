import { clsx } from "clsx";
import { RadioGroup } from "radix-ui";
import { forwardRef } from "react";

import {
  SegmentedControlsProvider,
  useSegmentedControlsContext,
} from "./segmentedControls.context";
import * as styles from "./segmentedControls.css";
import type {
  SegmentedControlsRootProps,
  SegmentedControlsItemProps,
} from "./segmentedControls.types";

const SegmentedControlsRoot = forwardRef<HTMLDivElement, SegmentedControlsRootProps>(
  ({ size = "md", children, className, ...props }, ref) => {
    return (
      <SegmentedControlsProvider value={{ size }}>
        <RadioGroup.Root ref={ref} {...props} className={clsx(styles.root(), className)}>
          {children}
        </RadioGroup.Root>
      </SegmentedControlsProvider>
    );
  },
);

SegmentedControlsRoot.displayName = "SegmentedControls.Root";

const SegmentedControlsItem = forwardRef<HTMLButtonElement, SegmentedControlsItemProps>(
  ({ value, disabled = false, children, className, ...props }, ref) => {
    const { size } = useSegmentedControlsContext("SegmentedControls.Item");
    return (
      <RadioGroup.Item
        ref={ref}
        value={value}
        disabled={disabled}
        {...props}
        className={clsx(styles.item({ size }), className)}
      >
        <span className={styles.itemLabel({ size })}>{children}</span>
      </RadioGroup.Item>
    );
  },
);

SegmentedControlsItem.displayName = "SegmentedControls.Item";

export const SegmentedControls = {
  Root: SegmentedControlsRoot,
  Item: SegmentedControlsItem,
};
