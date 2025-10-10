import { forwardRef } from 'react';

import { Icon } from '../Icon';
import { StyledIconButton, getIconSizeForButton } from './iconButton.styles';

import type { IconButtonBasicProps, IconButtonFeedbackProps } from '@/components';

const IconButtonBasic = forwardRef<HTMLButtonElement, IconButtonBasicProps>(
  ({ icon, size = 'md', hierarchy = 'primary', disabled = false, ...restProps }, ref) => {
    const iconSize = getIconSizeForButton(size);

    return (
      <StyledIconButton
        ref={ref}
        $hierarchy={hierarchy}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        <Icon name={icon} size={iconSize} />
      </StyledIconButton>
    );
  },
);

IconButtonBasic.displayName = 'IconButton.Basic';

const IconButtonFeedback = forwardRef<HTMLButtonElement, IconButtonFeedbackProps>(
  ({ icon, size = 'md', intent = 'destructive', disabled = false, ...restProps }, ref) => {
    const iconSize = getIconSizeForButton(size);

    return (
      <StyledIconButton
        ref={ref}
        $intent={intent}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        <Icon name={icon} size={iconSize} />
      </StyledIconButton>
    );
  },
);

IconButtonFeedback.displayName = 'IconButton.Feedback';

export const IconButton = {
  Basic: IconButtonBasic,
  Feedback: IconButtonFeedback,
};
