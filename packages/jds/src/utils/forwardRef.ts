import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { forwardRef } from "react";

/**
 * Polymorphic Component Prop type (ref 제외)
 */
export type PolymorphicProps<E extends ElementType, P> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | "as"> & {
    as?: E;
  };

export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>["ref"];

export type PolymorphicComponentPropsWithRef<E extends ElementType, P> = PolymorphicProps<E, P> & {
  ref?: PolymorphicRef<E>;
};

type PolymorphicComponent<DefaultElement extends ElementType, OwnProps = Record<string, never>> = (<
  E extends ElementType = DefaultElement,
>(
  props: PolymorphicComponentPropsWithRef<E, OwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

/**
 * @template DefaultElement - 기본 요소 타입
 * @template OwnProps - 컴포넌트 고유 props
 */
export function PolymorphicForwardRef<
  DefaultElement extends ElementType,
  OwnProps = Record<string, never>,
>(
  render: <E extends ElementType = DefaultElement>(
    props: PolymorphicProps<E, OwnProps>,
    ref: PolymorphicRef<E>,
  ) => ReactElement | null,
): PolymorphicComponent<DefaultElement, OwnProps> {
  return forwardRef(render as never) as PolymorphicComponent<DefaultElement, OwnProps>;
}
