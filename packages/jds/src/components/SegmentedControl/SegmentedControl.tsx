import { ToggleGroup } from 'radix-ui';
import { createContext, forwardRef, useContext } from 'react';

import { Label } from '../Label';
import {
  SegmentedControlRootStyled,
  SegmentedControlContentStyled,
  SegmentedControlItemStyled,
} from './segmentedControl.styles';
import type {
  SegmentedControlSize,
  SegmentedControlRootProps,
  SegmentedControlItemProps,
} from './segmentedControl.types';

const SegmentedControlContext = createContext<{ size: SegmentedControlSize }>({
  size: 'md',
});

const useSegmentedControlContext = () => {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error('SegmentedControl components must be used within SegmentedControl.Root');
  }
  return context;
};

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlRootProps>(
  ({ size = 'md', children, value, defaultValue, onValueChange, ...props }, ref) => {
    return (
      <SegmentedControlContext.Provider value={{ size }}>
        <SegmentedControlRootStyled ref={ref} size={size} {...props}>
          <ToggleGroup.Root
            asChild
            type={'single'}
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
          >
            <SegmentedControlContentStyled size={size}>{children}</SegmentedControlContentStyled>
          </ToggleGroup.Root>
        </SegmentedControlRootStyled>
      </SegmentedControlContext.Provider>
    );
  },
);

SegmentedControlRoot.displayName = 'SegmentedControl.Root';

const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ value, isDisabled = false, children, ...props }, ref) => {
    const { size } = useSegmentedControlContext();

    return (
      <ToggleGroup.Item asChild value={value} disabled={isDisabled} {...props}>
        <SegmentedControlItemStyled ref={ref} size={size} $isDisabled={isDisabled}>
          <Label size={size} color='inherit'>
            {children}
          </Label>
        </SegmentedControlItemStyled>
      </ToggleGroup.Item>
    );
  },
);

SegmentedControlItem.displayName = 'SegmentedControl.Item';

export const SegmentedControl = {
  Root: SegmentedControlRoot,
  Item: SegmentedControlItem,
};
