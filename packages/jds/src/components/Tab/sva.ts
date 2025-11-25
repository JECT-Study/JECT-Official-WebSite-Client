import type { CSSObject } from '@emotion/react';

/**
 * 'true' | 'false' → boolean으로 매핑
 * 그 외는 그대로 유지
 */
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

/**
 * A 또는 A 배열
 */
type OneOrMore<T> = T | readonly T[];

/* -----------------------------------------------------------------------------
 * 공통: variants 모양(스타일 타입 상관없이)
 * -----------------------------------------------------------------------------*/

/**
 *
 *   { [variantName]: { [variantValue]: unknown } }
 *
 */
type VariantRecordLike = {
  [VariantName in string]: {
    [VariantValue in string]: unknown;
  };
};

/* -----------------------------------------------------------------------------
 * cva(단일 컴포넌트)용 타입
 * -----------------------------------------------------------------------------*/

/**
 * cva 스타일 variants:
 *
 * {
 *   size:   { sm: CSSObject; md: CSSObject }
 *   tone:   { primary: CSSObject; ghost: CSSObject }
 * }
 */
export type RecipeVariantRecord = {
  [VariantName in string]: {
    [VariantValue in string]: CSSObject;
  };
};

/**
 * variants 정의 → 컴포넌트에서 받는 variant props 타입
 *
 * TVariants = {
 *   variant: { header: ..., content: ... }
 *   isItemStretched: { false: ..., true: ... }
 * }
 *
 * => {
 *   variant?: 'header' | 'content';
 *   isItemStretched?: boolean;
 * }
 */
export type RecipeSelection<TVariants extends VariantRecordLike> = {
  [K in keyof TVariants]?: StringToBoolean<keyof TVariants[K]>;
};

/**
 * compoundVariants 에서 사용하는 selection 타입
 *
 * TVariants = {
 *   size: { sm: ..., md: ... }
 *   tone: { primary: ..., ghost: ... }
 * }
 *
 * => {
 *   size?: 'sm' | readonly ('sm' | 'md')[];
 *   tone?: 'primary' | readonly 'primary'[];
 * }
 */
export type RecipeCompoundSelection<TVariants extends VariantRecordLike> = {
  [K in keyof TVariants]?: OneOrMore<StringToBoolean<keyof TVariants[K]>>;
};

/**
 * compoundVariants 한 항목
 *
 * {
 *   size?: 'sm' | ['sm', 'md'];
 *   tone?: 'primary';
 *   css: CSSObject;
 * }
 */
export type RecipeCompoundVariant<TVariants extends RecipeVariantRecord> =
  RecipeCompoundSelection<TVariants> & {
    css: CSSObject;
  };

/**
 * cva용 recipe 정의 타입
 *
 * 예시 (정확한 형태):
 * ```ts
 * const buttonRecipe = cva({
 *   base: { display: 'inline-flex' },
 *   variants: {
 *     size: {
 *       sm: { fontSize: 12 },
 *       md: { fontSize: 14 },
 *     },
 *     tone: {
 *       primary: { color: 'royalblue' },
 *       ghost: { color: 'gray' },
 *     },
 *   },
 *   defaultVariants: { size: 'sm', tone: 'primary' },
 *   compoundVariants: [
 *     { size: 'md', tone: 'primary', css: { fontWeight: 600 } },
 *   ],
 * });
 * // RecipeVariantProps<typeof buttonRecipe>
 * // => { size?: 'sm' | 'md'; tone?: 'primary' | 'ghost' }
 * ```
 */
export interface RecipeDefinition<TVariants extends RecipeVariantRecord> {
  base: CSSObject;
  variants: TVariants;
  defaultVariants?: RecipeSelection<TVariants>;
  //아직 compountVariants는 사용안함
  compoundVariants?: readonly RecipeCompoundVariant<TVariants>[];
}

/**
 * cva: queryOptions 스타일 헬퍼
 * - 타입만 체크하고 config 그대로 리턴
 */
/**
 * cva: 단일 컴포넌트 스타일 레시피 정의 헬퍼 (타입 전용)
 *
 * 사용 예시
 * ```ts
 * // 1) 레시피 정의
 * const buttonRecipe = cva({
 *   base: { display: 'inline-flex', alignItems: 'center' },
 *   variants: {
 *     size: {
 *       sm: { fontSize: 12, padding: '4px 8px' },
 *       md: { fontSize: 14, padding: '6px 12px' },
 *     },
 *     tone: {
 *       primary: { color: 'royalblue' },
 *       ghost: { color: 'gray' },
 *     },
 *   },
 *   defaultVariants: { size: 'sm', tone: 'primary' },
 *   compoundVariants: [
 *     { size: 'md', tone: 'primary', css: { fontWeight: 600 } },
 *   ],
 * });
 *
 * // 2) variant props 타입 추론
 * type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;
 * // => { size?: 'sm' | 'md'; tone?: 'primary' | 'ghost' }
 *
 * // 3) 컴포넌트에서 사용 (css prop 병합)
 * function Button(props: ButtonVariantProps & { children: React.ReactNode }) {
 *   const size = props.size ?? buttonRecipe.defaultVariants?.size ?? 'sm';
 *   const tone = props.tone ?? buttonRecipe.defaultVariants?.tone ?? 'primary';
 *   return (
 *     <button
 *       css={[
 *         buttonRecipe.base,
 *         buttonRecipe.variants.size[size],
 *         buttonRecipe.variants.tone[tone],
 *       ]}
 *       {...props}
 *     />
 *   );
 * }
 * ```
 */
export function recipe<const TVariants extends RecipeVariantRecord>(
  config: RecipeDefinition<TVariants>,
): RecipeDefinition<TVariants> {
  return config;
}

/**
 * cva 별칭 (recipe와 동일)
 */
/**
 *
 * 타입 헬퍼 함수
 * ```ts
 * const button = cva({
 *   base: { display: 'inline-flex' },
 *   variants: {
 *     size: { sm: { fontSize: 12 }, md: { fontSize: 14 } },
 *     tone: { primary: { color: 'royalblue' }, ghost: { color: 'gray' } },
 *   },
 *   defaultVariants: { size: 'sm', tone: 'primary' },
 * });
 *
 * type ButtonVariantProps = RecipeVariantProps<typeof button>;
 * // => { size?: 'sm' | 'md'; tone?: 'primary' | 'ghost' }
 * ```
 */
export const cva = recipe;

/* -----------------------------------------------------------------------------
 * sva(slot recipe)용 타입
 * -----------------------------------------------------------------------------*/

/**
 * slot별 스타일
 *
 * S = 'root' | 'icon' 이면
 *   { root?: CSSObject; icon?: CSSObject }
 */

/**
 * slot recipe variants:
 *
 * {
 *   size: {
 *     sm: { root: CSSObject; icon: CSSObject }
 *     md: { ... }
 *   }
 *   tone: { ... }
 * }
 */

export type SlotBaseStyleRecord<S extends string> = {
  [Slot in S]: CSSObject; // required
};

export type SlotVariantStyleRecord<S extends string> = {
  [Slot in S]?: CSSObject; // optional
};
export type SlotRecipeVariantRecord<S extends string> = {
  [VariantName in string]: {
    [VariantValue in string]: SlotVariantStyleRecord<S>;
  };
};

/**
 * slot recipe용 compoundVariants
 *
 * {
 *   size?: 'sm' | ['sm', 'md'];
 *   tone?: 'primary';
 *   css: { root?: CSSObject; icon?: CSSObject; ... }
 * }
 */
export type SlotRecipeCompoundVariant<
  S extends string,
  TVariants extends SlotRecipeVariantRecord<S>,
> = RecipeCompoundSelection<TVariants> & {
  css: SlotVariantStyleRecord<S>;
};

/**
 * sva용 recipe 정의 타입
 *
 * slotRecipe({
 *   slots: ['root', 'list', 'trigger'] as const,
 *   base: { root: {...}, list: {...}, ... },
 *   variants: { ... },
 *   defaultVariants: { ... },
 *   compoundVariants: [...]
 * })
 */
export interface SlotRecipeDefinition<
  S extends string,
  TVariants extends SlotRecipeVariantRecord<S>,
> {
  slots: readonly S[];
  base: SlotBaseStyleRecord<S>;
  deprecated?: boolean | string;
  variants: TVariants;
  defaultVariants?: RecipeSelection<TVariants>;
  compoundVariants?: readonly SlotRecipeCompoundVariant<S, TVariants>[];
}

/**
 * sva:
 * -  타입만 체크하고 config 그대로 리턴
 */

type NormalizeSlotVariants<S extends string, TVariants extends SlotRecipeVariantRecord<S>> = {
  [VN in keyof TVariants]: {
    [VV in keyof TVariants[VN]]: SlotVariantStyleRecord<S>;
  };
};
/**
 * sva: 멀티 슬롯 컴포넌트 스타일 레시피 정의 헬퍼 (타입 전용)
 *
 * 사용 예시
 * ```ts
 * // 1) 레시피 정의
 * const tabsRecipe = sva({
 *   slots: ['root', 'list', 'trigger', 'indicator'] as const,
 *   base: {
 *     root: { display: 'flex', flexDirection: 'column' },
 *     list: { display: 'flex', position: 'relative' },
 *     trigger: { display: 'inline-flex' },
 *     indicator: { position: 'absolute', borderBottomWidth: 1, borderBottomStyle: 'solid' },
 *   },
 *   variants: {
 *     variant: {
 *       header: {
 *         list: { borderBottomWidth: 1, borderBottomStyle: 'solid' },
 *         trigger: { padding: '6px 12px' },
 *       },
 *       content: {
 *         list: { gap: 8 },
 *         trigger: { padding: '8px 12px', border: '1px solid', borderRadius: 6 },
 *         indicator: { display: 'none' },
 *       },
 *     },
 *     isItemStretched: {
 *       false: { list: { justifyContent: 'flex-start' }, trigger: { flex: 'initial' } },
 *       true: { list: { justifyContent: 'space-around' }, trigger: { flex: 1 } },
 *     },
 *   },
 *   defaultVariants: { variant: 'header', isItemStretched: false },
 * });
 *
 * // 2) variant props 타입 추론
 * type TabsVariantProps = RecipeVariantProps<typeof tabsRecipe>;
 * // => { variant?: 'header' | 'content'; isItemStretched?: boolean }
 *
 * // 3) 컴포넌트에서 사용 (css prop 병합)
 * function TabList(props: TabsVariantProps & React.ComponentProps<'div'>) {
 *   const variant = props.variant ?? tabsRecipe.defaultVariants?.variant ?? 'header';
 *   const stretch = (props.isItemStretched ?? tabsRecipe.defaultVariants?.isItemStretched ?? false) ? 'true' : 'false';
 *   return (
 *     <div
 *       css={[
 *         tabsRecipe.base.list,
 *         tabsRecipe.variants.variant[variant].list,
 *         tabsRecipe.variants.isItemStretched[stretch].list,
 *       ]}
 *       {...props}
 *     />
 *   );
 * }
 * ```
 */
export function slotRecipe<
  const S extends string,
  const TVariants extends SlotRecipeVariantRecord<S>,
>(config: SlotRecipeDefinition<S, TVariants>) {
  return config as unknown as SlotRecipeDefinition<S, NormalizeSlotVariants<S, TVariants>>;
}

/**
 * sva: 멀티 슬롯 컴포넌트 스타일 레시피 헬퍼(별칭)
 *
 *
 * 사용 예시
 * ```ts
 * const tabs = sva({
 *   slots: ['root', 'list', 'trigger'] as const,
 *   base: {
 *     root: { display: 'flex' },
 *     list: { display: 'flex', position: 'relative' },
 *     trigger: { display: 'inline-flex' },
 *   },
 *   variants: {
 *     variant: {
 *       header: { list: { borderBottomWidth: 1 }, trigger: { padding: '6px 12px' } },
 *       content: { list: { gap: 8 }, trigger: { padding: '8px 12px', borderRadius: 6 } },
 *     },
 *     isItemStretched: {
 *       false: { list: { justifyContent: 'flex-start' }, trigger: { flex: 'initial' } },
 *       true: { list: { justifyContent: 'space-around' }, trigger: { flex: 1 } },
 *     },
 *   },
 *   defaultVariants: { variant: 'header', isItemStretched: false },
 * });
 *
 * type TabsVariantProps = RecipeVariantProps<typeof tabs>;
 * // => { variant?: 'header' | 'content'; isItemStretched?: boolean }
 * ```
 */
export const sva = slotRecipe;

/* -----------------------------------------------------------------------------
 * 공통: variant props 추론 유틸 (cva / sva 둘 다 지원)
 * -----------------------------------------------------------------------------*/

/**
 * RecipeVariantProps
 *
 * variants의 타입을 추론하는 유틸리티 타입
 *
 * 예시 1) cva (단일 컴포넌트)
 * ```ts
 * const buttonRecipe = cva({
 *   base: {},
 *   variants: {
 *     size: { sm: {}, md: {} },
 *     tone: { primary: {}, ghost: {} },
 *   },
 *   defaultVariants: { size: 'sm', tone: 'primary' },
 * });
 *
 * type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;
 * // => { size?: 'sm' | 'md'; tone?: 'primary' | 'ghost' }
 * ```
 *
 * 예시 2) sva (멀티 슬롯)
 * ```ts
 * const tabsRecipe = sva({
 *   slots: ['root', 'list', 'trigger'] as const,
 *   base: { root: {}, list: {}, trigger: {} },
 *   variants: {
 *     variant: {
 *       header: { list: {}, trigger: {} },
 *       content: { list: {}, trigger: {} },
 *     },
 *     isItemStretched: {
 *       false: { list: {} },
 *       true: { list: {}, trigger: {} },
 *     },
 *   },
 *   defaultVariants: { variant: 'header', isItemStretched: false },
 * });
 *
 * type TabsVariantProps = RecipeVariantProps<typeof tabsRecipe>;
 * // => { variant?: 'header' | 'content'; isItemStretched?: boolean }
 * ```
 */
export type RecipeVariantProps<T> = T extends { variants: infer TVariants }
  ? TVariants extends VariantRecordLike
    ? RecipeSelection<TVariants>
    : never
  : never;

/**
 * 모든 variant를 required type으로 사용
 *
 * ```ts
 * type ButtonVariant = RecipeVariant<typeof buttonRecipe>;
 * ```
 */
export type RecipeVariant<T> = Required<RecipeVariantProps<T>>;
