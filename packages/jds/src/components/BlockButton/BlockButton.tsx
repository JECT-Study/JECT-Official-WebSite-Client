import { forwardRef } from 'react';

import { iconSizeMap, StyledBlockButton } from './blockButton.styles';

import type { BlockButtonBasicProps, BlockButtonFeedbackProps } from '@/components';
import { Icon } from '@/components';

const BlockButtonBasic = forwardRef<HTMLButtonElement, BlockButtonBasicProps>(
  (
    {
      children,
      size = 'md',
      variant = 'solid',
      hierarchy = 'primary',
      prefixIcon,
      suffixIcon,
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    //Todo: 아이콘 사이즈도 전부 스타일의 theme 단위에서 해결하면 좋을듯(Theme 구조 추가 필요)
    const iconSize = iconSizeMap[size];

    return (
      <StyledBlockButton
        ref={ref}
        $hierarchy={hierarchy}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </StyledBlockButton>
    );
  },
);

BlockButtonBasic.displayName = 'BlockButton.Basic';

const BlockButtonFeedback = forwardRef<HTMLButtonElement, BlockButtonFeedbackProps>(
  (
    {
      children,
      size = 'md',
      intent = 'destructive',
      prefixIcon,
      suffixIcon,
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size];

    return (
      <StyledBlockButton
        ref={ref}
        $intent={intent}
        $size={size}
        $disabled={disabled}
        disabled={disabled}
        {...restProps}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </StyledBlockButton>
    );
  },
);

BlockButtonFeedback.displayName = 'BlockButton.Feedback';

export const BlockButton = {
  Basic: BlockButtonBasic,
  Feedback: BlockButtonFeedback,
};

export type { BlockButtonBasicProps, BlockButtonFeedbackProps };
