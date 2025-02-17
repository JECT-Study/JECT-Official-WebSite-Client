import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction';
import {
  labelButtonStyle,
  Size,
  Hierarchy,
  labelButtonInteractionMap,
} from '@/styles/labelButtonStyle';

export interface LabelButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size: Size;
  hierarchy: Hierarchy;
}

export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  ({ children, leftIcon, rightIcon, size, hierarchy, className, disabled, ...props }, ref) => {
    const baseClasses =
      'inline-flex flex-row py-0 px-0 justify-center items-center gap-4xs radius-xs';

    const combinedClasses = clsx(
      baseClasses,
      labelButtonStyle.size[size],
      disabled ? labelButtonStyle.disabled?.[hierarchy] : labelButtonStyle.hierarchy[hierarchy],
      {
        'cursor-not-allowed pointer-events-none': disabled,
        'cursor-pointer pointer-events-auto': !disabled,
      },
      className,
    );

    const { variant: interactionVariant, density: interactionDensity } =
      labelButtonInteractionMap[hierarchy];

    return (
      <Interaction variant={interactionVariant} density={interactionDensity}>
        <button ref={ref} className={combinedClasses} disabled={!!disabled} {...props}>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </button>
      </Interaction>
    );
  },
);

LabelButton.displayName = 'LabelButton';

export default LabelButton;
