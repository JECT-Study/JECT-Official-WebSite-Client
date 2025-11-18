import { forwardRef, useId } from 'react';

import type { InputAreaProps } from './inputArea.types';
import { Icon } from '../../Icon';
import { getInteractionStates } from '../input.types';
import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
  StyledTextAreaWrapper,
  StyledTextArea,
  StyledHelperContainer,
  StyledHelperText,
  StyledCountText,
} from './inputArea.styles';

export const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  (
    {
      style = 'outlined',
      layout = 'vertical',
      validation = 'none',
      interaction = 'enabled',
      label,
      labelIcon,
      labelVisible = true,
      helperText,
      maxLength,
      height,
      minHeight,
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();
    const { isDisabled, isReadOnly } = getInteractionStates(interaction);
    const currentLength = value.length;

    const hasHelperContainer = Boolean(helperText) || Boolean(maxLength);

    return (
      <StyledFieldContainer $layout={layout}>
        {label && labelVisible && (
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as='label'
              htmlFor={inputId}
              size='sm'
              weight='normal'
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              $layout={layout}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='2xs' />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
          <StyledTextAreaWrapper
            $style={style}
            $validation={validation}
            $disabled={isDisabled}
            $readOnly={isReadOnly}
            $height={height}
            $minHeight={minHeight}
          >
            <StyledTextArea
              ref={ref}
              id={inputId}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              $hasFixedHeight={Boolean(height)}
              value={value}
              onChange={onChange}
              disabled={isDisabled}
              readOnly={isReadOnly}
              maxLength={maxLength}
              {...restProps}
            />
          </StyledTextAreaWrapper>

          {hasHelperContainer && (
            <StyledHelperContainer
              $validation={validation}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
            >
              {helperText && (
                <StyledHelperText as='span' size='sm' weight='normal'>
                  {helperText}
                </StyledHelperText>
              )}

              {maxLength && (
                <StyledCountText as='span' size='sm' weight='normal' textAlign='right'>
                  {`${currentLength}/${maxLength}`}
                </StyledCountText>
              )}
            </StyledHelperContainer>
          )}
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

InputArea.displayName = 'InputArea';
