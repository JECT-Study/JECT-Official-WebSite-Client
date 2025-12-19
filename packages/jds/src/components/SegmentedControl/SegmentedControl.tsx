import { ToggleGroup } from "radix-ui";
import type { ElementRef } from "react";
import { createContext, forwardRef, useContext } from "react";

import { Label } from "../Label";
import {
  SegmentedControlRootStyled,
  SegmentedControlContentStyled,
  SegmentedControlItemStyled,
} from "./segmentedControl.styles";
import type {
  SegmentedControlSize,
  SegmentedControlRootProps,
  SegmentedControlItemProps,
} from "./segmentedControl.types";

const SegmentedControlContext = createContext<{ size: SegmentedControlSize }>({
  size: "md",
});

const useSegmentedControlContext = () => useContext(SegmentedControlContext);

const SegmentedControlRoot = forwardRef<
  ElementRef<typeof SegmentedControlRootStyled>,
  SegmentedControlRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <SegmentedControlContext.Provider value={{ size }}>
      <SegmentedControlRootStyled ref={ref} size={size}>
        <ToggleGroup.Root asChild type='single' {...props}>
          <SegmentedControlContentStyled size={size}>{children}</SegmentedControlContentStyled>
        </ToggleGroup.Root>
      </SegmentedControlRootStyled>
    </SegmentedControlContext.Provider>
  );
});

SegmentedControlRoot.displayName = "SegmentedControl.Root";

const SegmentedControlItem = forwardRef<
  ElementRef<typeof SegmentedControlItemStyled>,
  SegmentedControlItemProps
>(({ value, disabled = false, children, ...props }, ref) => {
  const { size } = useSegmentedControlContext();

  return (
    <ToggleGroup.Item asChild value={value} disabled={disabled} {...props}>
      <SegmentedControlItemStyled ref={ref} size={size} $isDisabled={disabled}>
        <Label size={size} color='inherit'>
          {children}
        </Label>
      </SegmentedControlItemStyled>
    </ToggleGroup.Item>
  );
});

SegmentedControlItem.displayName = "SegmentedControl.Item";

export const SegmentedControl = {
  Root: SegmentedControlRoot,
  Item: SegmentedControlItem,
};
