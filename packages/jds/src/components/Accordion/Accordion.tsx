import { Icon } from 'components';
import { forwardRef, useState } from 'react';

import {
  StyledAccordionContainer,
  StyledAccordionHeader,
  StyledHeaderContent,
  StyledLabelText,
  StyledChevronIcon,
  StyledAccordionBody,
  StyledBodyText,
  iconSizeMap,
} from './accordion.styles';
import type { AccordionProps } from './accordion.types';

/**
 * Accordion 컴포넌트
 *
 * 아코디언은 추가적인 정보를 숨기거나 펼쳐서 보여줄 수 있는 컴포넌트입니다.
 * 사용자가 원하는 시점에 정보를 열람하거나 닫을 수 있도록 하여, 화면 공간을 효율적으로 관리하는 데 도움을 줍니다.
 *
 * @example
 * ```tsx
 * <Accordion
 *   labelText="제목"
 *   bodyText="본문 내용"
 *   size="md"
 *   isExpanded={false}
 * />
 * ```
 */
export const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  (
    {
      size = 'md',
      isExpanded: controlledIsExpanded,
      isStretched = false,
      disabled = false,
      withPrefixIcon = false,
      prefixIcon,
      labelText,
      bodyText,
      children,
      onToggle,
      ...restProps
    },
    ref,
  ) => {
    // children element 또는 bodyText 사용함.
    const content = children ?? bodyText;
    // 내부 상태 관리 (제어되지 않는 경우)
    const [isInternalExpanded, setIsInternalExpanded] = useState(false);

    const isControlled = controlledIsExpanded !== undefined;
    const isExpanded = isControlled ? controlledIsExpanded : isInternalExpanded;

    const iconSize = iconSizeMap[size];

    const handleToggle = () => {
      if (disabled) return;

      const isNewExpanded = !isExpanded;

      if (!isControlled) {
        setIsInternalExpanded(isNewExpanded);
      }

      onToggle?.(isNewExpanded);
    };

    return (
      <StyledAccordionContainer
        $size={size}
        $isExpanded={isExpanded}
        $isStretched={isStretched}
        $disabled={disabled}
      >
        <StyledAccordionHeader
          ref={ref}
          $size={size}
          $disabled={disabled}
          disabled={disabled}
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-disabled={disabled}
          {...restProps}
        >
          <StyledHeaderContent>
            {withPrefixIcon && prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
            <StyledLabelText $size={size} $disabled={disabled}>
              {labelText}
            </StyledLabelText>
          </StyledHeaderContent>

          <StyledChevronIcon $isExpanded={isExpanded} $disabled={disabled}>
            <Icon name='arrow-down-s-line' size={iconSize} />
          </StyledChevronIcon>
        </StyledAccordionHeader>

        {content && (
          <StyledAccordionBody $size={size} $isExpanded={isExpanded}>
            <StyledBodyText $size={size}>{content}</StyledBodyText>
          </StyledAccordionBody>
        )}
      </StyledAccordionContainer>
    );
  },
);

Accordion.displayName = 'Accordion';
