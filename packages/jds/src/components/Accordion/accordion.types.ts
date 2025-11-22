import type { IconName } from 'components';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type AccordionSize = 'lg' | 'md' | 'sm';
export type AccordionState = 'rest' | 'hover' | 'active' | 'focus';

export interface AccordionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  /**
   * 아코디언 크기
   * @default 'md'
   */
  size?: AccordionSize;

  /**
   * 아코디언이 확장되었는지 여부
   * @default false
   */
  isExpanded?: boolean;

  /**
   * 컴포넌트 너비를 시각적 패딩 없이 늘려서 있는지 여부
   * @default false
   */
  isStretched?: boolean;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 내부에 접두 아이콘을 표현할지 여부
   * @default false
   */
  withPrefixIcon?: boolean;

  /**
   * 접두 아이콘 이름 (withPrefixIcon이 true일 때 사용)
   */
  prefixIcon?: IconName;

  /**
   * 제목 레이블 텍스트
   */
  labelText: string;

  /**
   * 본문 내용 (텍스트, Element, 컴포넌트 등)
   */
  bodyText?: ReactNode;

  /**
   * 본문 내용 (children 방식)
   * bodyText와 동일한 역할
   */
  children?: ReactNode;

  /**
   * 아코디언 확장/축소 시 호출되는 콜백
   */
  onToggle?: (isExpanded: boolean) => void;
}

export interface AccordionStyledProps {
  $size: AccordionSize;
  $isExpanded: boolean;
  $isStretched: boolean;
  $disabled: boolean;
}

export interface AccordionHeaderProps {
  $size: AccordionSize;
  $disabled: boolean;
}

export interface AccordionBodyProps {
  $size: AccordionSize;
  $isExpanded: boolean;
}
