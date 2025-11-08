import type { CheckboxBasicProps, CheckboxBoxProps, CheckboxContentProps } from 'components';
import { Icon } from 'components';
import { forwardRef, useCallback, useEffect, useRef } from 'react';

import {
  GetIconSize,
  GetSubLabelSize,
  StyledCheckboxBasicBox,
  StyledCheckboxBasicContainer,
  StyledCheckboxBoxWrapper,
  StyledCheckboxContentContainer,
  StyledHiddenInput,
  StyledLabelContent,
  StyledMainLabel,
  StyledSubLabel,
} from './checkbox.styles';

const CheckboxBox = forwardRef<HTMLInputElement, CheckboxBoxProps>(
  (
    {
      checked,
      isIndeterminate,
      disabled = false,
      isInvalid = false,
      size = 'md',
      id,
      onCheckedChange,
      ...restProps
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const iconSize = GetIconSize(size);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const handleChange = useCallback(
      ({ target }: { target: HTMLInputElement }) => {
        onCheckedChange?.(target.checked);
      },
      [onCheckedChange],
    );

    return (
      <StyledCheckboxBasicBox
        $size={size}
        $checked={checked}
        $isIndeterminate={isIndeterminate}
        $disabled={disabled}
        $isInvalid={isInvalid}
      >
        {isIndeterminate ? (
          <Icon name='subtract-line' size={iconSize} />
        ) : checked ? (
          <Icon name='check-line' size={iconSize} />
        ) : null}
        <StyledHiddenInput
          ref={setRefs}
          type='checkbox'
          id={id}
          checked={checked}
          disabled={disabled}
          aria-invalid={isInvalid}
          onChange={handleChange}
          {...restProps}
        />
      </StyledCheckboxBasicBox>
    );
  },
);

CheckboxBox.displayName = 'CheckboxBox';

const CheckboxBasic = forwardRef<HTMLInputElement, CheckboxBasicProps>(
  (
    {
      checked = false,
      isIndeterminate = false,
      disabled = false,
      isInvalid = false,
      size = 'md',
      id,
      onCheckedChange,
      ...restProps
    },
    ref,
  ) => {
    return (
      <StyledCheckboxBasicContainer $size={size} $disabled={disabled} htmlFor={id}>
        <CheckboxBox
          ref={ref}
          checked={checked}
          isIndeterminate={isIndeterminate}
          disabled={disabled}
          isInvalid={isInvalid}
          size={size}
          id={id}
          onCheckedChange={onCheckedChange}
          {...restProps}
        />
      </StyledCheckboxBasicContainer>
    );
  },
);

CheckboxBasic.displayName = 'Checkbox.Basic';

const CheckboxContent = forwardRef<HTMLInputElement, CheckboxContentProps>(
  (
    {
      size = 'md',
      align = 'left',
      variant = 'empty',
      label,
      subLabel,
      checked = false,
      isIndeterminate = false,
      disabled = false,
      isInvalid = false,
      id,
      onCheckedChange,
      ...restProps
    },
    ref,
  ) => {
    return (
      <StyledCheckboxContentContainer
        $size={size}
        $align={align}
        $variant={variant}
        $checked={checked}
        $isIndeterminate={isIndeterminate}
        $disabled={disabled}
        $isInvalid={isInvalid}
        htmlFor={id}
      >
        <StyledCheckboxBoxWrapper $size={size}>
          <CheckboxBox
            ref={ref}
            checked={checked}
            isIndeterminate={isIndeterminate}
            disabled={disabled}
            isInvalid={isInvalid}
            size={size}
            id={id}
            onCheckedChange={onCheckedChange}
            {...restProps}
          />
        </StyledCheckboxBoxWrapper>
        <StyledLabelContent>
          <StyledMainLabel
            as='span'
            size={size}
            weight='normal'
            $disabled={disabled}
            $isInvalid={isInvalid}
          >
            {label}
          </StyledMainLabel>
          {subLabel && (
            <StyledSubLabel
              as='span'
              size={GetSubLabelSize(size)}
              weight='normal'
              $disabled={disabled}
              $isInvalid={isInvalid}
            >
              {subLabel}
            </StyledSubLabel>
          )}
        </StyledLabelContent>
      </StyledCheckboxContentContainer>
    );
  },
);

CheckboxContent.displayName = 'Checkbox.Content';

export const Checkbox = {
  Basic: CheckboxBasic,
  Content: CheckboxContent,
};
