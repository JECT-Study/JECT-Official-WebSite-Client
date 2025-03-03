import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import {
  blockButtonStyle,
  Size,
  Style,
  Hierarchy,
  blockButtonInteractionMap,
} from '@/styles/blockButtonStyle';

export interface BlockButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size: Size;
  style: Style;
  hierarchy: Hierarchy;
}

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  (
    { children, leftIcon, rightIcon, size, style, hierarchy, className, disabled, ...props },
    ref,
  ) => {
    const { variant, density, isInversed } = blockButtonInteractionMap[style][hierarchy];

    const interaction = `interaction-${variant}-${density}${isInversed ? '-inverse' : ''}`;

    const baseClasses =
      'inline-flex flex-row justify-center items-center gap-4xs transition-faster-fluent';

    const combinedClasses = clsx(
      interaction,
      baseClasses,
      blockButtonStyle.size[size],
      disabled
        ? blockButtonStyle.disabled?.[style][hierarchy]
        : blockButtonStyle.variant[style][hierarchy],
      className,
      {
        'cursor-not-allowed pointer-events-none': disabled,
        'cursor-pointer pointer-events-auto': !disabled,
      },
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

BlockButton.displayName = 'BlockButton';

export default BlockButton;
