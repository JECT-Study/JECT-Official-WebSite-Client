import { clsx } from "clsx";
import { Children, Fragment, forwardRef, useMemo } from "react";

import { stepsItem, stepsLabel, stepsRoot, stepsSeparatorIcon, stepsSeparatorLine } from "./steps.css";
import type { StepsItemProps, StepsRootProps } from "./steps.types";
import { useStepsItemActivated } from "./steps.utils";
import { StepsContext, useStepsContext } from "./stepsContext";
import { NumericBadge } from "../Badge";
import { Divider } from "../Divider";
import { Icon } from "../Icon";

const stepsNumericBadgeSizeMap = {
  lg: "sm",
  md: "xs",
} as const;

const StepsSeparator = () => {
  const { size, layout } = useStepsContext("Steps.Separator");

  if (layout === "horizontal") {
    return (
      <Icon
        name='arrow-right-s-line'
        size={size === "lg" ? "sm" : "xs"}
        className={stepsSeparatorIcon}
      />
    );
  }

  return (
    <div className={stepsSeparatorLine({ size })}>
      <Divider orientation='vertical' thickness='bold' />
    </div>
  );
};

const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>(
  ({ size = "md", layout = "horizontal", current, children, className, ...restProps }, ref) => {
    const contextValue = useMemo(
      () => ({ size, layout, currentStep: current }),
      [size, layout, current],
    );
    const childList = Children.toArray(children);

    return (
      <StepsContext.Provider value={contextValue}>
        <div
          ref={ref}
          role='list'
          aria-orientation={layout}
          className={clsx(stepsRoot({ size, layout }), className)}
          {...restProps}
        >
          {childList.map((child, childIndex) => (
            <Fragment key={childIndex}>
              {childIndex > 0 && <StepsSeparator />}
              {child}
            </Fragment>
          ))}
        </div>
      </StepsContext.Provider>
    );
  },
);

StepsRoot.displayName = "Steps.Root";

const StepsItem = forwardRef<HTMLDivElement, StepsItemProps>(
  ({ index, activated: activatedProp, children, className, ...restProps }, ref) => {
    const { size, layout, currentStep } = useStepsContext("Steps.Item");

    const isActivated = useStepsItemActivated({ itemIndex: index, currentStep, activatedProp });
    const isCurrentStep = currentStep === index;

    return (
      <div
        ref={ref}
        role='listitem'
        aria-current={isCurrentStep ? "step" : undefined}
        data-activated={isActivated}
        className={clsx(stepsItem({ layout }), className)}
        {...restProps}
      >
        <NumericBadge.Basic
          hierarchy={isActivated ? "accent" : "tertiary"}
          size={stepsNumericBadgeSizeMap[size]}
        >
          {index + 1}
        </NumericBadge.Basic>
        <span className={stepsLabel({ size, activated: isActivated })}>{children}</span>
      </div>
    );
  },
);

StepsItem.displayName = "Steps.Item";

export const Steps = {
  Root: StepsRoot,
  Item: StepsItem,
};
