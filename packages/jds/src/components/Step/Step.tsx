import { clsx } from "clsx";
import { Context } from "radix-ui/internal";
import { Children, Fragment, forwardRef, useMemo } from "react";

import {
  stepItem,
  stepLabel,
  stepRoot,
  stepSeparatorIcon,
  stepSeparatorLine,
} from "./step.css";
import type { StepItemProps, StepLayout, StepRootProps, StepSize } from "./step.types";
import { useStepItemActivated } from "./step.utils";
import { NumericBadge } from "../Badge";
import { Divider } from "../Divider";
import { Icon } from "../Icon";

type StepContextValue = {
  size: StepSize;
  layout: StepLayout;
  currentStep?: number;
};

const [StepProvider, useStepContext] = Context.createContext<StepContextValue>("Step");

const stepNumericBadgeSizeMap = {
  lg: "sm",
  md: "xs",
} as const;

const StepSeparator = () => {
  const { size, layout } = useStepContext("Step.Separator");

  if (layout === "horizontal") {
    return (
      <Icon
        name="arrow-right-s-line"
        size={size === "lg" ? "sm" : "xs"}
        className={stepSeparatorIcon}
      />
    );
  }

  return (
    <div className={stepSeparatorLine({ size })}>
      <Divider orientation="vertical" thickness="bold" />
    </div>
  );
};

const StepRoot = forwardRef<HTMLDivElement, StepRootProps>(
  ({ size = "md", layout = "horizontal", current, children, className, ...restProps }, ref) => {
    const contextValue = useMemo(
      () => ({ size, layout, currentStep: current }),
      [size, layout, current],
    );

    return (
      <StepProvider {...contextValue}>
        <div ref={ref} className={clsx(stepRoot({ size, layout }), className)} {...restProps}>
          {Children.map(children, (child, childIndex) => (
            <Fragment key={childIndex}>
              {childIndex > 0 && <StepSeparator />}
              {child}
            </Fragment>
          ))}
        </div>
      </StepProvider>
    );
  },
);

StepRoot.displayName = "Step.Root";

const StepItem = forwardRef<HTMLDivElement, StepItemProps>(
  ({ index, activated: activatedProp, children, className, ...restProps }, ref) => {
    const { size, layout, currentStep } = useStepContext("Step.Item");

    const activated = useStepItemActivated({ itemIndex: index, currentStep, activatedProp });

    return (
      <div
        ref={ref}
        data-activated={activated}
        className={clsx(stepItem({ layout }), className)}
        {...restProps}
      >
        <NumericBadge.Basic
          hierarchy={activated ? "accent" : "tertiary"}
          size={stepNumericBadgeSizeMap[size]}
        >
          {index + 1}
        </NumericBadge.Basic>
        <span className={stepLabel({ size, activated })}>{children}</span>
      </div>
    );
  },
);

StepItem.displayName = "Step.Item";

export const Step = {
  Root: StepRoot,
  Item: StepItem,
};
