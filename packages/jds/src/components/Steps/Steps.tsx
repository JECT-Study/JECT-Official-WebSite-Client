import { clsx } from "clsx";
import { Children, forwardRef, useMemo } from "react";

import {
  stepsItem,
  stepsLabel,
  stepsListItem,
  stepsRoot,
  stepsSeparatorIcon,
  stepsSeparatorLine,
} from "./steps.css";
import { useStepsItemActivated } from "./steps.utils";
import type { StepsItemProps, StepsRootProps, StepsSize } from "./steps.types";
import { StepsContext, useStepsContext } from "./stepsContext";
import type { BadgeSize } from "../Badge";
import { NumericBadge } from "../Badge";
import { Divider } from "../Divider";
import { Icon } from "../Icon";

const stepsNumericBadgeSizeMap: Record<StepsSize, BadgeSize> = {
  lg: "sm",
  md: "xs",
} as const;
  lg: "sm",
  md: "xs",
} as const;

const StepsSeparator = () => {
  const { size, layout } = useStepsContext("Steps.Separator");

  if (layout === "horizontal") {
    return (
      <Icon
        aria-hidden
        name='arrow-right-s-line'
        size={size === "lg" ? "sm" : "xs"}
        className={stepsSeparatorIcon}
      />
    );
  }

  return (
    <div className={stepsSeparatorLine({ size })} aria-hidden>
      <Divider orientation='vertical' thickness='bold' />
    </div>
  );
};

const StepsRoot = forwardRef<HTMLOListElement, StepsRootProps>(
  ({ size = "md", layout = "horizontal", current, children, className, ...restProps }, ref) => {
    const contextValue = useMemo(
      () => ({ size, layout, currentStep: current }),
      [size, layout, current],
    );
    const childList = Children.toArray(children);

    return (
      <StepsContext.Provider value={contextValue}>
        <ol
          {...restProps}
          ref={ref}
          role='list'
          className={clsx(stepsRoot({ size, layout }), className)}
        >
          {childList.map((child, childIndex) => (
            <li className={stepsListItem({ size, layout })} key={childIndex}>
              {childIndex > 0 && <StepsSeparator />}
              {child}
            </li>
          ))}
        </ol>
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
        {...restProps}
        ref={ref}
        aria-current={isCurrentStep ? "step" : undefined}
        data-activated={isActivated}
        className={clsx(stepsItem({ layout }), className)}
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
