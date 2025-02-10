import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import { labelButtonStyle, ButtonSize, ButtonHierarchy } from '@/styles/LabelButtonStyle';

export interface LabelButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size: ButtonSize;
  hierarchy: ButtonHierarchy;
}

export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  ({ children, leftIcon, rightIcon, size, hierarchy, className, ...props }, ref) => {
    const baseClasses =
      'inline-flex flex-row py-0 px-0 justify-center items-center gap-4xs rounded-[var(--radius-none,0px)]';

    const combinedClasses = clsx(
      baseClasses,
      labelButtonStyle.size[size],
      labelButtonStyle.hierarchy[hierarchy],
      className,
    );

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </button>
    );
  },
);

LabelButton.displayName = 'LabelButton';

export default LabelButton;
