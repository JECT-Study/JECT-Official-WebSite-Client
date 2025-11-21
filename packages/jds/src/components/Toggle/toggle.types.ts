import type { ComponentPropsWithoutRef } from 'react';

export type ToggleSize = 'lg' | 'md';
export type ToggleState = 'rest' | 'hover' | 'active' | 'focus';

export interface ToggleProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onChange'> {
  /**
   * 토글의 크기
   * @default 'md'
   */
  size?: ToggleSize;

  /**
   * 체크(선택) 여부
   * @default false
   */
  isChecked?: boolean;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 토글 상태 변경 시 호출되는 콜백
   */
  onChange?: (isChecked: boolean) => void;
}

export interface ToggleStyledProps {
  $size: ToggleSize;
  $isChecked: boolean;
  $disabled: boolean;
}

export interface ToggleThumbProps {
  $size: ToggleSize;
  $isChecked: boolean;
  $disabled: boolean;
}
