import { Context } from 'radix-ui/internal';
import { forwardRef, useMemo } from 'react';

import type { StepItemProps, StepRootProps, StepSize } from './step.types';
import { useStepItemStatus } from './step.utils';
import { Divider } from '../Divider';
import {
  StyledCounterNumber,
  StyledStepContent,
  StyledStepItem,
  StyledStepLabel,
  StyledStepRoot,
} from './step.styles';
import type { LabelSize } from '../Label/Label.style';

const SIZE_TO_LABEL_SIZE: Record<StepSize, LabelSize> = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs',
};

type StepContextValue = {
  size: StepSize;
  currentStep?: number;
};

const [StepProvider, useStepContext] = Context.createContext<StepContextValue>('Step');

const StepRoot = forwardRef<HTMLDivElement, StepRootProps>(
  ({ size = 'md', current, children, ...restProps }, ref) => {
    const contextValue = useMemo(() => ({ size, currentStep: current }), [size, current]);

    return (
      <StepProvider {...contextValue}>
        <StyledStepRoot ref={ref} {...restProps}>
          {children}
        </StyledStepRoot>
      </StepProvider>
    );
  },
);

StepRoot.displayName = 'Step.Root';

const StepItem = forwardRef<HTMLDivElement, StepItemProps>(
  ({ index, status: statusProp, children, ...restProps }, ref) => {
    const { size, currentStep } = useStepContext('Step.Item');
    const labelSize = SIZE_TO_LABEL_SIZE[size];

    const status = useStepItemStatus({ itemIndex: index, currentStep, statusProp });

    return (
      <StyledStepItem ref={ref} data-status={status} {...restProps}>
        <Divider orientation='horizontal' thickness='bolder' />
        <StyledStepContent>
          <StyledCounterNumber $size={size}>{index + 1}</StyledCounterNumber>
          <StyledStepLabel as='span' size={labelSize} color='inherit'>
            {children}
          </StyledStepLabel>
        </StyledStepContent>
      </StyledStepItem>
    );
  },
);

StepItem.displayName = 'Step.Item';

export const Step = {
  Root: StepRoot,
  Item: StepItem,
};
