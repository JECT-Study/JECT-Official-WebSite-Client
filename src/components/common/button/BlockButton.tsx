import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import {
  blockButtonStyle,
  ButtonSize,
  ButtonStyle,
  ButtonHierarchy,
} from '@/styles/blockButtonStyle';

export interface BlockButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size: ButtonSize;
  style: ButtonStyle;
  hierarchy: ButtonHierarchy;
}

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  ({ children, leftIcon, rightIcon, size, style, hierarchy, className, ...props }, ref) => {
    const baseClasses = 'inline-flex flex-row justify-center items-center gap-4xs';

    const combinedClasses = clsx(
      baseClasses,
      blockButtonStyle.size[size],
      blockButtonStyle.variant[style][hierarchy],
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

BlockButton.displayName = 'BlockButton';

export default BlockButton;
