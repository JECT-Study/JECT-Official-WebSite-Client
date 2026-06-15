import { clsx } from "clsx";
import { RadioGroup } from "radix-ui";
import { createContext, forwardRef, useContext, useMemo } from "react";

import * as styles from "./segmentedControl.css";
import type {
  SegmentedControlSize,
  SegmentedControlRootProps,
  SegmentedControlItemProps,
} from "./segmentedControl.types";

const SegmentedControlContext = createContext<{ size: SegmentedControlSize }>({
  size: "md",
});

const useSegmentedControlContext = () => useContext(SegmentedControlContext);

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlRootProps>(
  ({ size = "md", children, className, ...props }, ref) => {
    const contextValue = useMemo(() => ({ size }), [size]);
    return (
      <SegmentedControlContext.Provider value={contextValue}>
        <RadioGroup.Root ref={ref} {...props} className={clsx(styles.root(), className)}>
          {children}
        </RadioGroup.Root>
      </SegmentedControlContext.Provider>
    );
  },
);

SegmentedControlRoot.displayName = "SegmentedControl.Root";

const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ value, disabled = false, children, className, ...props }, ref) => {
    const { size } = useSegmentedControlContext();
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

SegmentedControlItem.displayName = "SegmentedControl.Item";

export const SegmentedControl = {
  Root: SegmentedControlRoot,
  Item: SegmentedControlItem,
};
