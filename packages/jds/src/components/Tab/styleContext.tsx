/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Interpolation, Theme } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { createContext, useContext, forwardRef } from "react";
import { useMemo } from "react";
import type { ElementType, ComponentPropsWithoutRef, ElementRef, ComponentType } from "react";

import type { RecipeVariant as RecipeVariantProps } from "./sva";

type EmotionStyle = Interpolation<Theme>;

/**
 * sva runtime:
 *   recipe(variants?) => { root, list, trigger, ... }
 *   각 값은 Emotion css prop에 넣을 수 있는 Interpolation<Theme>
 */
// Public helper type aliases (Panda-like)
export type Assign<A, B> = Omit<A, keyof B> & B;
export type JsxStyleProps = { css?: EmotionStyle };
export type JsxHTMLProps<Base, Extra = {}> = Assign<Base, Extra>;
export type UnstyledProps = { unstyled?: boolean };
export type ComponentProps<T extends ElementType> = ComponentPropsWithoutRef<T>;
export type JsxFactoryOptions<P = {}> = { defaultProps?: Partial<P> };

// Slot recipe
type AnySlotRecipeRuntime = (props?: any) => Record<string, EmotionStyle>;
type AnySlotRecipeFactory = (...args: any[]) => AnySlotRecipeRuntime;
type AnyRecipeInput = AnySlotRecipeRuntime | AnySlotRecipeFactory;

type RuntimeOf<T> = T extends (...args: any[]) => infer R
  ? R extends (...a: any[]) => any
    ? R
    : T
  : never;
type SlotsMapOf<T> = ReturnType<RuntimeOf<T>>;
type SlotsOf<T> = keyof SlotsMapOf<T> & string;
type VariantsOf<T> = RecipeVariantProps<RuntimeOf<T>>;

export interface StyleContext<R extends AnyRecipeInput> {
  withRootProvider: <T extends ElementType>(
    Component: T,
    options?: JsxFactoryOptions<ComponentProps<T>>,
  ) => ComponentType<ComponentProps<T> & UnstyledProps & VariantsOf<R>>;
  withProvider: <T extends ElementType>(
    Component: T,
    slot: SlotsOf<R>,
    options?: JsxFactoryOptions<ComponentProps<T>>,
  ) => ComponentType<
    JsxHTMLProps<ComponentProps<T> & UnstyledProps, Assign<VariantsOf<R>, JsxStyleProps>>
  >;
  withContext: <T extends ElementType>(
    Component: T,
    slot: SlotsOf<R>,
    options?: JsxFactoryOptions<ComponentProps<T>>,
  ) => ComponentType<JsxHTMLProps<ComponentProps<T> & UnstyledProps, JsxStyleProps>>;
  useSlotStyles: () => SlotsMapOf<R>;
  useSlotStyle: (slot: SlotsOf<R>) => EmotionStyle | undefined;
}

const getDisplayName = (Component: any) => Component?.displayName || Component?.name || "Component";

export function createStyleContext<R extends AnyRecipeInput>(recipeOrFactory: R): StyleContext<R> {
  type Slots = SlotsOf<R>;
  type Variants = VariantsOf<R>;
  type StylesMap = SlotsMapOf<R>; // { root: EmotionStyle; list: EmotionStyle; ... }

  const StylesContext = createContext<StylesMap | null>(null);

  /* ---------- hooks ---------- */

  const useSlotStyles = (): StylesMap => {
    const value = useContext(StylesContext);
    if (!value) {
      throw new Error("StyleContext Provider 밖에서 useSlotStyles를 호출했습니다.");
    }
    return value;
  };

  const useSlotStyle = (slot: Slots): EmotionStyle | undefined => {
    const styles = useSlotStyles();
    return styles[slot];
  };

  /* ---------- Root Provider ---------- */

  function withRootProvider<T extends ElementType>(
    Component: T,
    // _options?: JsxFactoryOptions<ComponentProps<T>>,
  ) {
    type BaseProps = ComponentProps<T>;
    type Props = BaseProps & Variants & UnstyledProps & JsxStyleProps;

    const Wrapped = forwardRef<ElementRef<T>, Props>((props, ref) => {
      // recipe factory 또는 runtime을 처리합니다
      const theme = useTheme();
      const runtime = useMemo(() => {
        try {
          const factoryRuntime = (recipeOrFactory as AnySlotRecipeFactory)(theme);
          return typeof factoryRuntime === "function"
            ? factoryRuntime
            : (recipeOrFactory as AnySlotRecipeRuntime);
        } catch {
          return recipeOrFactory as AnySlotRecipeRuntime;
        }
      }, [theme]);

      // variant props는 전부 runtime으로 넘깁니다
      const styles = runtime(props as Variants) as StylesMap;
      const rootStyle = props.unstyled ? undefined : styles.root;

      return (
        <StylesContext.Provider value={styles}>
          <Component ref={ref} {...(props as any)} css={[rootStyle, (props as any).css]} />
        </StylesContext.Provider>
      );
    });

    Wrapped.displayName = `StyleContextRoot(${getDisplayName(Component)})`;
    return Wrapped as unknown as ComponentType<ComponentProps<T> & UnstyledProps & Variants>;
  }

  /* ---------- Provider (slot + Provider 둘 다) ---------- */

  function withProvider<T extends ElementType>(
    Component: T,
    slot: Slots,
    // _options?: JsxFactoryOptions<ComponentProps<T>>,
  ) {
    type BaseProps = ComponentProps<T>;
    type Props = BaseProps & Variants & UnstyledProps & JsxStyleProps;

    const Wrapped = forwardRef<ElementRef<T>, Props>((props, ref) => {
      const theme = useTheme();
      const runtime = useMemo(() => {
        try {
          const maybe = (recipeOrFactory as AnySlotRecipeFactory)(theme);
          return typeof maybe === "function" ? maybe : (recipeOrFactory as AnySlotRecipeRuntime);
        } catch {
          return recipeOrFactory as AnySlotRecipeRuntime;
        }
      }, [theme]);

      const styles = runtime(props as Variants) as StylesMap;
      const slotStyle = props.unstyled ? undefined : styles[slot];

      return (
        <StylesContext.Provider value={styles}>
          <Component ref={ref} {...(props as any)} css={[slotStyle, (props as any).css]} />
        </StylesContext.Provider>
      );
    });

    Wrapped.displayName = `StyleContextProvider(${getDisplayName(Component)}:${slot})`;
    return Wrapped as unknown as ComponentType<
      JsxHTMLProps<ComponentProps<T> & UnstyledProps, Assign<Variants, JsxStyleProps>>
    >;
  }

  /* ---------- Consumer (Context만 사용하는 slot) ---------- */

  function withContext<T extends ElementType>(
    Component: T,
    slot: Slots,
    // _options?: JsxFactoryOptions<ComponentProps<T>>,
  ) {
    type BaseProps = ComponentProps<T>;
    type Props = BaseProps & UnstyledProps & JsxStyleProps;

    const Wrapped = forwardRef<ElementRef<T>, Props>((props, ref) => {
      const styles = useContext(StylesContext);

      if (!styles) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            `StyleContext: "${getDisplayName(
              Component,
            )}"가 Provider 밖에서 렌더링되었습니다. slot="${slot}".`,
          );
        }
        // Provider 없으면 그냥 원래 css 그대로 내려보냅니다
        return <Component ref={ref} {...(props as any)} css={(props as any).css} />;
      }

      const slotStyle = props.unstyled ? undefined : styles[slot];

      return <Component ref={ref} {...(props as any)} css={[slotStyle, (props as any).css]} />;
    });

    Wrapped.displayName = `StyleContextConsumer(${getDisplayName(Component)}:${slot})`;
    return Wrapped as unknown as ComponentType<
      JsxHTMLProps<ComponentProps<T> & UnstyledProps, JsxStyleProps>
    >;
  }

  return {
    withRootProvider,
    withProvider,
    withContext,
    useSlotStyles,
    useSlotStyle,
  } as unknown as StyleContext<R>;
}
