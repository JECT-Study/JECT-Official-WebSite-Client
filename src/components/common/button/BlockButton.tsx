import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction';
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
  ({ children, leftIcon, rightIcon, size, style, hierarchy, className, ...props }, ref) => {
    const baseClasses = 'peer inline-flex flex-row justify-center items-center gap-4xs';

    const combinedClasses = clsx(
      baseClasses,
      blockButtonStyle.size[size],
      blockButtonStyle.variant[style][hierarchy],
      className,
    );

    const {
      variant: interactionVariant,
      density: interactionDensity,
      isInversed: isInteractionInversed,
    } = blockButtonInteractionMap[style][hierarchy];

    return (
      <Interaction
        variant={interactionVariant}
        density={interactionDensity}
        isInversed={isInteractionInversed}
      >
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
