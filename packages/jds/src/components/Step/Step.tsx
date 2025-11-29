import { forwardRef } from 'react';

import type { StepItemProps, StepRootProps, StepSize } from './step.types';
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

const StepRoot = forwardRef<HTMLDivElement, StepRootProps>(({ children, ...restProps }, ref) => {
  return (
    <StyledStepRoot ref={ref} {...restProps}>
      {children}
    </StyledStepRoot>
  );
});

StepRoot.displayName = 'Step.Root';

const StepItem = forwardRef<HTMLDivElement, StepItemProps>(
  ({ status, size = 'md', children, ...restProps }, ref) => {
    const labelSize = SIZE_TO_LABEL_SIZE[size];

    return (
      <StyledStepItem ref={ref} data-status={status} {...restProps}>
        <Divider orientation='horizontal' thickness='bolder' />
        <StyledStepContent>
          <StyledCounterNumber $size={size} />
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
