import { ComponentPropsWithRef, ElementType, ForwardedRef, ReactElement, forwardRef } from 'react';

type ElementRef<E extends ElementType> = ComponentPropsWithRef<E>['ref'] extends
  | ((instance: infer T | null) => void)
  | { current: infer T | null }
  | null
  | undefined
  ? T
  : never;

type PolymorphicPropsWithRef<E extends ElementType, OwnProps> = OwnProps &
  Omit<ComponentPropsWithRef<E>, keyof OwnProps | 'as'> & {
    as?: E;
    ref?: ForwardedRef<ElementRef<E>>;
  };

/**
 * Polymorphic 컴포넌트를 위한 제네릭 forwardRef 헬퍼
 *
 * @template DefaultElement - 기본 요소 타입
 * @template OwnProps - 컴포넌트 고유 props
 *
 */
export function PolymorphicForwardRef<
  DefaultElement extends ElementType,
  OwnProps = Record<string, never>,
>(
  render: <E extends ElementType = DefaultElement>(
    props: PolymorphicPropsWithRef<E, OwnProps>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => ReactElement | null,
) {
  return forwardRef<unknown, PolymorphicPropsWithRef<DefaultElement, OwnProps>>(
    render as never,
  ) as <E extends ElementType = DefaultElement>(
    props: PolymorphicPropsWithRef<E, OwnProps>,
  ) => ReactElement | null;
}
