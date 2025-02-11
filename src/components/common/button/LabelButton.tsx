import clsx from 'clsx';
import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/Interaction.tsx';
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
  ({ children, leftIcon, rightIcon, size, hierarchy, className, ...props }, ref) => {
    const baseClasses =
      'inline-flex flex-row py-0 px-0 justify-center items-center gap-4xs rounded-[var(--radius-none,0px)]';

    const combinedClasses = clsx(
      baseClasses,
      labelButtonStyle.size[size],
      labelButtonStyle.hierarchy[hierarchy],
      className,
    );

    const { variant: interactionVariant, density: interactionDensity } =
      labelButtonInteractionMap[hierarchy];

    return (
      <Interaction variant={interactionVariant} density={interactionDensity} radius='radius-xs'>
        <button ref={ref} className={combinedClasses} {...props}>
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
