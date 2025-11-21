import { forwardRef, useState } from 'react';

import { StyledToggleTrack, StyledToggleThumb } from './toggle.styles';
import type { ToggleProps } from './toggle.types';

/**
 * Toggle 컴포넌트
 *
 * 켜지거나 꺼진 상태를 전환할 수 있도록 제어하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Toggle
 *   size="md"
 *   isChecked={false}
 *   onChange={(checked) => console.log(checked)}
 * />
 * ```
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { size = 'md', isChecked: controlledIsChecked, disabled = false, onChange, ...restProps },
    ref,
  ) => {
    const [isInternalChecked, setIsInternalChecked] = useState(false);

    const isControlled = controlledIsChecked !== undefined;
    const isChecked = isControlled ? controlledIsChecked : isInternalChecked;

    const handleToggle = () => {
      if (disabled) return;

      const isNewChecked = !isChecked;

      if (!isControlled) {
        setIsInternalChecked(isNewChecked);
      }

      onChange?.(isNewChecked);
    };

    return (
      <StyledToggleTrack
        ref={ref}
        type='button'
        role='switch'
        $size={size}
        $isChecked={isChecked}
        $disabled={disabled}
        disabled={disabled}
        aria-checked={isChecked}
        aria-disabled={disabled}
        onClick={handleToggle}
        {...restProps}
      >
        <StyledToggleThumb $size={size} $isChecked={isChecked} $disabled={disabled} />
      </StyledToggleTrack>
    );
  },
);

Toggle.displayName = 'Toggle';
