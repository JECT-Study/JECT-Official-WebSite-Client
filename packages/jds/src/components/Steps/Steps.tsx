import { clsx } from "clsx";
import { Children, forwardRef } from "react";

import { StepsProvider, useStepsContext } from "./steps.context";
import {
  stepsItem,
  stepsLabel,
  stepsListItem,
  stepsRoot,
  stepsSeparatorIcon,
  stepsSeparatorLine,
} from "./steps.css";
import type { StepsItemProps, StepsRootProps, StepsSize } from "./steps.types";
import type { BadgeSize } from "../Badge";
import { NumericBadge } from "../Badge";
import { Divider } from "../Divider";
import type { IconSize } from "../Icon";
import { Icon } from "../Icon";

import { getLabelClassName, type LabelSize } from "@/utils/typography";

const stepsNumericBadgeSizeMap: Record<StepsSize, BadgeSize> = {
  lg: "sm",
  md: "xs",
} as const;

const stepsSeparatorSizeMap: Record<StepsSize, IconSize> = {
  lg: "xs",
  md: "2xs",
} as const;

const stepsLabelTypographySizeMap: Record<StepsSize, LabelSize> = {
  lg: "md",
  md: "sm",
} as const;

interface ResolveActivatedParams {
  currentStep: number | undefined;
  index: number;
  activated: boolean | undefined;
}

const resolveActivated = ({ currentStep, index, activated }: ResolveActivatedParams) =>
  activated ?? (currentStep !== undefined && index <= currentStep);

const StepsSeparator = () => {
  const { size, layout } = useStepsContext("Steps.Separator");

  if (layout === "horizontal") {
    return (
      <Icon
        aria-hidden
        name='chevron-right'
        size={stepsSeparatorSizeMap[size]}
        className={stepsSeparatorIcon}
      />
    );
  }

  return (
    <div className={stepsSeparatorLine({ size })} aria-hidden>
      <Divider orientation='vertical' thickness='bold' decorative />
    </div>
  );
};

const StepsRoot = forwardRef<HTMLOListElement, StepsRootProps>(
  ({ size = "md", layout = "horizontal", current, children, className, ...restProps }, ref) => {
    const childList = Children.toArray(children);

    return (
      <StepsProvider value={{ size, layout, currentStep: current }}>
        <ol
          {...restProps}
          ref={ref}
          role='list'
          className={clsx(stepsRoot({ size, layout }), className)}
        >
          {childList.map((child, childIndex) => (
            <li className={stepsListItem({ layout })} key={childIndex}>
              {childIndex > 0 && <StepsSeparator />}
              {child}
            </li>
          ))}
        </ol>
      </StepsProvider>
    );
  },
);

StepsRoot.displayName = "Steps.Root";

const StepsItem = forwardRef<HTMLDivElement, StepsItemProps>(
  ({ index, activated: activatedProp, children, className, ...restProps }, ref) => {
    const { size, layout, currentStep } = useStepsContext("Steps.Item");

    const isActivated = resolveActivated({ currentStep, index, activated: activatedProp });
    const isCurrentStep = currentStep === index;

    return (
      <div
        {...restProps}
        ref={ref}
        aria-current={isCurrentStep ? "step" : undefined}
        data-steps-activated={isActivated}
        className={clsx(stepsItem({ layout }), className)}
      >
        <NumericBadge
          hierarchy={isActivated ? "accent" : "tertiary"}
          size={stepsNumericBadgeSizeMap[size]}
        >
          {index + 1}
        </NumericBadge>
        <span
          className={clsx(
            stepsLabel({ activated: isActivated }),
            getLabelClassName({ size: stepsLabelTypographySizeMap[size], weight: "bold" }),
          )}
        >
          {children}
        </span>
      </div>
    );
  },
);

StepsItem.displayName = "Steps.Item";

export const Steps = {
  Root: StepsRoot,
  Item: StepsItem,
};
