import type {
  CheckboxBasicProps,
  CheckboxBoxProps,
  CheckboxContentProps,
  CheckedState,
} from 'components';
import { Icon } from 'components';
import { forwardRef, useCallback } from 'react';

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
    const iconSize = GetIconSize(size);

    //NOTE : refCallback으로 처리된 부분을 추후 useComposedRefs(Radix 기준) 등의 커스텀 훅으로 분리 가능성 -ref 관리 용이
    const refCallback = useCallback(
      (node: HTMLInputElement | null) => {
        //TEST:  refCallback 호출 로깅
        console.group('🔍 [Checkbox] refCallback called');
        console.log('timestamp:', new Date().toISOString());
        console.log('node:', node ? 'ATTACHED' : 'DETACHED (null)');
        console.log('isIndeterminate:', isIndeterminate);
        console.groupEnd();

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }

        if (node) {
          node.indeterminate = isIndeterminate;
        }
      },
      [ref, isIndeterminate],
    );

    const handleChange = useCallback(
      ({ target }: { target: HTMLInputElement }) => {
        const newState: CheckedState = target.checked;
        onCheckedChange?.(newState);
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
          ref={refCallback}
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
      disabled = false,
      isInvalid = false,
      size = 'md',
      id,
      onCheckedChange,
      ...restProps
    },
    ref,
  ) => {
    const isIndeterminate = checked === 'indeterminate';
    const isChecked = checked === true;

    return (
      <StyledCheckboxBasicContainer $disabled={disabled} htmlFor={id}>
        <CheckboxBox
          ref={ref}
          checked={isChecked}
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
      disabled = false,
      isInvalid = false,
      id,
      onCheckedChange,
      ...restProps
    },
    ref,
  ) => {
    const isIndeterminate = checked === 'indeterminate';
    const isChecked = checked === true;

    return (
      <StyledCheckboxContentContainer
        $size={size}
        $align={align}
        $variant={variant}
        $checked={isChecked}
        $isIndeterminate={isIndeterminate}
        $disabled={disabled}
        $isInvalid={isInvalid}
        htmlFor={id}
      >
        <StyledCheckboxBoxWrapper $size={size}>
          <CheckboxBox
            ref={ref}
            checked={isChecked}
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
