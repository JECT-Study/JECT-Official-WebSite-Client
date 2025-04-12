import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import {
  labelButtonStyle,
  Size,
  Hierarchy,
  labelButtonInteractionMap,
} from '@/components/common/button/labelButton.style';

export interface LabelButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size: Size;
  hierarchy: Hierarchy;
}

export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  ({ children, leftIcon, rightIcon, size, hierarchy, className, disabled, ...props }, ref) => {
    const { variant, density, isInversed } = labelButtonInteractionMap[hierarchy];

    const interaction = `interaction-${variant}-${density}${isInversed ? '-inverse-scale' : '-scale'}`;

    const baseClasses =
      'inline-flex flex-row py-0 px-0 justify-center items-center gap-4xs radius-xs transition-faster-fluent after:scale-x-118 after:scale-y-129';

    const combinedClasses = clsx(
      interaction,
      baseClasses,
      labelButtonStyle.size[size],
      disabled ? labelButtonStyle.disabled?.[hierarchy] : labelButtonStyle.hierarchy[hierarchy],
      {
        'cursor-not-allowed pointer-events-none': disabled,
        'cursor-pointer pointer-events-auto': !disabled,
      },
      className,
    );

    return (
      <button ref={ref} className={combinedClasses} disabled={!!disabled} {...props}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </button>
    );
  },
);

LabelButton.displayName = 'LabelButton';

export default LabelButton;
