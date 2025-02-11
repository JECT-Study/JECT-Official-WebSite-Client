import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/Interaction.tsx';
import {
  blockButtonStyle,
  Size,
  Style,
  Hierarchy,
  interactionMap,
} from '@/styles/blockButtonStyle';
import { extractRadius } from '@/utils/extractRadius.ts';

export interface BlockButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size: Size;
  style: Style;
  hierarchy: Hierarchy;
}

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  ({ children, leftIcon, rightIcon, size, style, hierarchy, className, ...props }, ref) => {
    const baseClasses = 'inline-flex flex-row justify-center items-center gap-4xs';
    const sizeClasses = blockButtonStyle.size[size];
    const radiusClass = extractRadius(sizeClasses);

    const combinedClasses = clsx(
      baseClasses,
      sizeClasses,
      blockButtonStyle.variant[style][hierarchy],
      className,
    );

    const { variant: interactionVariant, density: interactionDensity } =
      interactionMap[style][hierarchy];

    return (
      <Interaction variant={interactionVariant} density={interactionDensity} radius={radiusClass}>
        <button ref={ref} className={combinedClasses} {...props}>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </button>
      </Interaction>
    );
  },
);

BlockButton.displayName = 'BlockButton';

export default BlockButton;
