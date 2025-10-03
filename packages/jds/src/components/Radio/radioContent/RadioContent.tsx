import { forwardRef, ReactNode } from 'react';
import { Radio, RadioProps } from '../radioBasic/Radio';
import { Label } from '@/components/Label';
import { RadioContainerLabel } from './RadioContent.style';
import { useTheme } from 'theme';
import { SUB_LABEL_SIZE } from './radioContent.variants';

export interface RadioContentProps extends RadioProps {
  radioStyle?: 'empty' | 'outline';
  align?: 'left' | 'right';
  disabled?: boolean;
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
      disabled = false,
      subLabelVisible = false,
      subLabel = '',
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const labelColor = disabled ? theme.color.object.subtle : theme.color.object.bold;
    const subLabelColor = disabled ? theme.color.object.subtle : theme.color.object.assistive;

    return (
      <RadioContainerLabel
        radioSize={radioSize}
        isDisabled={disabled}
        isAlignRight={align === 'right'}
        isStyleOutline={radioStyle === 'outline'}
      >
        {align === 'right' && (
          <Label size={radioSize} textAlign='left' weight='normal' color={labelColor}>
            {children}
          </Label>
        )}
        <Radio ref={ref} radioSize={radioSize} disabled={disabled} {...props} />
        {align === 'left' && (
          <Label size={radioSize} textAlign='left' weight='normal' color={labelColor}>
            {children}
          </Label>
        )}
        {subLabelVisible && (
          <Label
            size={SUB_LABEL_SIZE[radioSize]}
            textAlign='left'
            weight='subtle'
            color={subLabelColor}
          >
            {subLabel}
          </Label>
        )}
      </RadioContainerLabel>
    );
  },
);

RadioContent.displayName = 'RadioContent';
