import { forwardRef, ReactNode } from 'react';
import { Radio, RadioProps } from '../radioBasic/Radio';
import { Label } from '@/components/Label';
import { RadioContainer } from './RadioContent.style';
import { useTheme } from 'theme';

export type RadioSize = 'lg' | 'md' | 'sm' | 'xs';

export interface RadioContentProps extends RadioProps {
  radioStyle?: 'empty' | 'outline';
  align?: 'left' | 'right';
  isChecked?: boolean;
  isDisabled?: boolean;
  subLabelVisible?: boolean;
  subLabel?: ReactNode;
  children: ReactNode;
}

export const RadioContent = forwardRef<HTMLInputElement, RadioContentProps>(
  (
    {
      radioSize = 'md',
      radioStyle = 'empty',
      align = 'left',
      isChecked = false,
      isDisabled = false,
      subLabelVisible = false,
      subLabel = '',
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const labelColor = isDisabled ? theme.color.object.subtle : theme.color.object.bold;

    return (
      <RadioContainer radioSize={radioSize} isDisabled={isDisabled}>
        <Radio
          ref={ref}
          radioSize={radioSize}
          checked={isChecked}
          disabled={isDisabled}
          {...props}
        />
        <Label size={radioSize} textAlign='left' weight='normal' color={labelColor}>
          {children}
        </Label>
        {/* <Label>{children}</Label> */}
      </RadioContainer>
    );
  },
);

RadioContent.displayName = 'RadioContent';
