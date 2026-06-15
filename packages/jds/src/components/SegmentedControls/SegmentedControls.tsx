import { clsx } from "clsx";
import { RadioGroup } from "radix-ui";
import { createContext, forwardRef, useContext, useMemo } from "react";

import * as styles from "./segmentedControls.css";
import type {
  SegmentedControlsSize,
  SegmentedControlsRootProps,
  SegmentedControlsItemProps,
} from "./segmentedControls.types";

const SegmentedControlsContext = createContext<{ size: SegmentedControlsSize }>({
  size: "md",
});

const useSegmentedControlsContext = () => useContext(SegmentedControlsContext);

const SegmentedControlsRoot = forwardRef<HTMLDivElement, SegmentedControlsRootProps>(
  ({ size = "md", children, className, ...props }, ref) => {
    const contextValue = useMemo(() => ({ size }), [size]);
    return (
      <SegmentedControlsContext.Provider value={contextValue}>
        <RadioGroup.Root ref={ref} {...props} className={clsx(styles.root(), className)}>
          {children}
        </RadioGroup.Root>
      </SegmentedControlsContext.Provider>
    );
  },
);

SegmentedControlsRoot.displayName = "SegmentedControls.Root";

const SegmentedControlsItem = forwardRef<HTMLButtonElement, SegmentedControlsItemProps>(
  ({ value, disabled = false, children, className, ...props }, ref) => {
    const { size } = useSegmentedControlsContext();
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
