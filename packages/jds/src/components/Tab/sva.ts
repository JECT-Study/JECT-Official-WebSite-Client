/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
// emotion-variants.ts
import { css, type CSSObject, type SerializedStyles } from '@emotion/react';

/* ----------------- 공통 타입 ----------------- */

type SlotName = string;

// variants shape 공통 베이스
export type VariantsConfigBase = {
  [VariantKey: string]: {
    [VariantValue: string]: unknown;
  };
};

export type VariantProps<V extends VariantsConfigBase> = {
  [K in keyof V]?: keyof V[K] & string;
};

export type VariantPropsOf<R> = R extends (props?: infer P) => unknown ? NonNullable<P> : never;

/* ----------------- SVA (multi-slot) ----------------- */

export type SlotStyles<S extends readonly SlotName[]> = {
  [K in S[number]]?: CSSObject;
};

export type SvaVariants<S extends readonly SlotName[]> = {
  [VariantKey: string]: {
    [VariantValue: string]: SlotStyles<S>;
  };
};

export interface SvaConfig<S extends readonly SlotName[], V extends SvaVariants<S>> {
  slots: S;
  base?: SlotStyles<S>;
  variants: V;
  defaultVariants?: Partial<VariantProps<V>>;
  compoundVariants?: Array<{
    variants: Partial<VariantProps<V>>;
    style: SlotStyles<S>;
  }>;
}

export interface SvaRecipe<S extends readonly SlotName[], V extends SvaVariants<S>> {
  (props?: VariantProps<V>): { [K in S[number]]: SerializedStyles };
  raw: (props?: VariantProps<V>) => { [K in S[number]]: CSSObject };
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const mergeStyles = (target: CSSObject = {}, source: CSSObject = {}) => {
  const out: CSSObject = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = out[key];

    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      out[key] = mergeStyles(targetValue as CSSObject, sourceValue as CSSObject);
    } else {
      out[key] = sourceValue;
    }
  }

  return out;
};

export function sva<S extends readonly SlotName[], V extends SvaVariants<S>>(
  config: SvaConfig<S, V>,
): SvaRecipe<S, V> {
  type Slots = S[number];
  type Props = VariantProps<V>;

  const variantKeys = Object.keys(config.variants) as (keyof V)[];

  const resolve = (props?: Props): Props => ({
    ...(config.defaultVariants ?? ({} as Props)),
    ...(props ?? ({} as Props)),
  });

  const computeRaw = (props?: Props): Record<Slots, CSSObject> => {
    const resolved = resolve(props);
    const result = {} as Record<Slots, CSSObject>;

    // base
    for (const slot of config.slots) {
      const key = slot as Slots;
      result[key] = { ...(config.base?.[key] ?? {}) };
    }

    // variants
    for (const variantName of variantKeys) {
      const value = resolved[variantName];
      if (!value) continue;

      const group = config.variants[variantName];
      const slotStyles = group[value as keyof typeof group];
      if (!slotStyles) continue;

      for (const slot in slotStyles) {
        const slotKey = slot as Slots;
        result[slotKey] = mergeStyles(result[slotKey], slotStyles[slotKey]);
      }
    }

    // compoundVariants
    if (config.compoundVariants) {
      for (const cv of config.compoundVariants) {
        let matched = true;

        for (const key in cv.variants) {
          const expected = cv.variants[key as keyof Props];
          if (expected === undefined) continue;
          if (resolved[key as keyof Props] !== expected) {
            matched = false;
            break;
          }
        }

        if (!matched) continue;

        for (const slot in cv.style) {
          const slotKey = slot as Slots;
          result[slotKey] = mergeStyles(result[slotKey], cv.style[slotKey]);
        }
      }
    }

    return result;
  };

  const recipe: SvaRecipe<S, V> = ((props?: Props) => {
    const raw = computeRaw(props);
    const out = {} as Record<Slots, SerializedStyles>;

    for (const slot of config.slots) {
      const key = slot as Slots;
      out[key] = css(raw[key]);
    }

    return out;
  }) as SvaRecipe<S, V>;

  recipe.raw = computeRaw;

  return recipe;
}

/* ----------------- CVA (single slot) ----------------- */

export type CvaVariants = {
  [VariantKey: string]: {
    [VariantValue: string]: CSSObject;
  };
};

export interface CvaConfig<V extends CvaVariants> {
  base?: CSSObject;
  variants: V;
  defaultVariants?: Partial<VariantProps<V>>;
  compoundVariants?: Array<{
    variants: Partial<VariantProps<V>>;
    style: CSSObject;
  }>;
}

export interface CvaRecipe<V extends CvaVariants> {
  (props?: VariantProps<V>): SerializedStyles;
  raw: (props?: VariantProps<V>) => CSSObject;
}

export function cva<V extends CvaVariants>(config: CvaConfig<V>): CvaRecipe<V> {
  type Props = VariantProps<V>;

  const variantKeys = Object.keys(config.variants) as (keyof V)[];

  const resolve = (props?: Props): Props => ({
    ...(config.defaultVariants ?? ({} as Props)),
    ...(props ?? ({} as Props)),
  });

  const computeRaw = (props?: Props): CSSObject => {
    const resolved = resolve(props);
    let result: CSSObject = { ...(config.base ?? {}) };

    // variants
    for (const variantName of variantKeys) {
      const value = resolved[variantName];
      if (!value) continue;

      const group = config.variants[variantName];
      const style = group[value as keyof typeof group];
      if (!style) continue;

      result = mergeStyles(result, style);
    }

    // compoundVariants
    if (config.compoundVariants) {
      for (const cv of config.compoundVariants) {
        let matched = true;

        for (const key in cv.variants) {
          const expected = cv.variants[key as keyof Props];
          if (expected === undefined) continue;
          if (resolved[key as keyof Props] !== expected) {
            matched = false;
            break;
          }
        }

        if (!matched) continue;

        result = mergeStyles(result, cv.style);
      }
    }

    return result;
  };

  const recipe: CvaRecipe<V> = ((props?: Props) => css(computeRaw(props))) as CvaRecipe<V>;

  recipe.raw = computeRaw;

  return recipe;
}

// Matches vanilla-extract's RecipeVariants and PandaCSS's RecipeVariantProps
export type RecipeVariants<R> = VariantPropsOf<R>;
export type RecipeVariantProps<R> = VariantPropsOf<R>;

// Extract slot union type from a recipe's raw() return type
export type RecipeSlots<R> = R extends { raw: (props?: any) => Record<infer S extends string, any> }
  ? S
  : never;

// Extract the raw style map type from a recipe
export type RecipeStyles<R> = R extends { raw: (props?: any) => infer M } ? M : never;

// Generic extraction that accepts either a recipe runtime or a factory returning a recipe runtime
type RuntimeFrom<T> = T extends (...args: any[]) => infer R
  ? R extends (...args: any[]) => any
    ? R
    : T
  : never;

// Single entry-point alias (usage: RecipeVariant<typeof tabRecipe>)
export type RecipeVariant<T> = VariantPropsOf<RuntimeFrom<T>>;
