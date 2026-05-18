import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem, focusRing, overlay, overlayColor } from "utils";

import { RADIO_SIZE_OPTIONS } from "./radio.types";
import type { RadioSize } from "./radio.types";

// Token key types
type StrokeWeightKey = keyof typeof vars.scheme.semantic.strokeWeight;

// Size maps
// sizeRem: 원형 indicator CSS 크기
// borderKey: checked 상태 border 굵기, strokeWeight 토큰 키에 대응
const radioSizeMap: Record<RadioSize, { sizeRem: string; borderKey: StrokeWeightKey }> = {
  lg: { sizeRem: pxToRem(20), borderKey: "6" },
  md: { sizeRem: pxToRem(18), borderKey: "5" },
  sm: { sizeRem: pxToRem(16), borderKey: "5" },
  xs: { sizeRem: pxToRem(14), borderKey: "4" },
};

// Typography per size
const typographyBySize = {
  lg: {
    fontSize: vars.typo.primitive.fontSize.label.lg,
    lineHeight: vars.typo.primitive.font.lineHeight.label.lg,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.subtle,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.lg,
  },
  md: {
    fontSize: vars.typo.primitive.fontSize.label.md,
    lineHeight: vars.typo.primitive.font.lineHeight.label.md,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.subtle,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.md,
  },
  sm: {
    fontSize: vars.typo.primitive.fontSize.label.sm,
    lineHeight: vars.typo.primitive.font.lineHeight.label.sm,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.subtle,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.sm,
  },
  xs: {
    fontSize: vars.typo.primitive.fontSize.label.xs,
    lineHeight: vars.typo.primitive.font.lineHeight.label.xs,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.subtle,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.xs,
  },
} satisfies Record<RadioSize, object>;

// Radio.Basic

export const radioInput = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

// VE selectors는 자신만 타겟할 수 있으므로, 기존 radioRootLabel의 입력 상태 선택자를
// radioVisual로 이동했다. radioRootLabel은 레이아웃 전용 style()로 단순화한다.
export const radioRootLabel = style({
  display: "inline-flex",
  position: "relative",
});

/**
 * `Radio.Basic`의 시각적 원형 indicator용 recipe.
 *
 * @remarks
 * 호출자는 className에 `"visual"` 리터럴을 반드시 함께 부여해야 한다.
 * `radioItem`의 globalStyle이 이 클래스명에 의존한다.
 *
 * input 상태(checked / disabled / focus-visible)에 따른 스타일은
 * `input[type="radio"]:state + &` 패턴으로 이 recipe에서 직접 처리한다.
 * VE selectors 규칙상 부모에서 형제를 타겟할 수 없기 때문이다.
 */
export const radioVisual = recipe({
  base: {
    borderRadius: vars.scheme.semantic.radius.max,
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: vars.color.semantic.surface.shallow,
    cursor: "pointer",
    position: "relative",
    outline: "none",
    selectors: {
      // input 상태에 따른 visual 스타일
      'input[type="radio"]:not(:disabled):checked + &': {
        backgroundColor: vars.color.semantic.surface.static.standard,
      },
      'input[type="radio"]:not(:checked):disabled + &': {
        backgroundColor: vars.color.semantic.surface.standard,
        borderColor: vars.color.semantic.stroke.alpha.subtler,
        cursor: "default",
      },
      'input[type="radio"]:checked:disabled + &': {
        backgroundColor: vars.color.semantic.fill.subtle,
        cursor: "default",
      },
      'input[type="radio"]:focus-visible + &': {
        boxShadow: `0 0 0 3px ${vars.color.semantic.interaction.focus}`,
      },
      // hover / active overlay
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: vars.color.semantic.interaction.normal,
        borderRadius: "inherit",
        opacity: 0,
        pointerEvents: "none",
      },
      "&:hover::after": { opacity: 0.08 },
      "&:active::after": { opacity: 0.12 },
    },
  },
  variants: {
    // size: checked / disabled-checked 상태의 border 굵기를 결정
    size: {
      lg: {
        width: radioSizeMap.lg.sizeRem,
        height: radioSizeMap.lg.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.lg.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.lg.borderKey]} solid ${vars.color.semantic.stroke.subtler}`,
          },
        },
      },
      md: {
        width: radioSizeMap.md.sizeRem,
        height: radioSizeMap.md.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.md.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.md.borderKey]} solid ${vars.color.semantic.stroke.subtler}`,
          },
        },
      },
      sm: {
        width: radioSizeMap.sm.sizeRem,
        height: radioSizeMap.sm.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.sm.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.sm.borderKey]} solid ${vars.color.semantic.stroke.subtler}`,
          },
        },
      },
      xs: {
        width: radioSizeMap.xs.sizeRem,
        height: radioSizeMap.xs.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.xs.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.xs.borderKey]} solid ${vars.color.semantic.stroke.subtler}`,
          },
        },
      },
    } satisfies Record<RadioSize, unknown>,
  },
});

// Radio.Item

// Size variants
const itemSizeVariants = {
  lg: {
    gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  md: {
    gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]}`,
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  sm: {
    gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  xs: {
    gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
  },
} satisfies Record<RadioSize, object>;

// empty 모드에서 ::after / ::before를 element 경계 밖으로 확장하는 크기
const itemInsetBySize: Record<RadioSize, string> = {
  lg: "-4px -6px",
  md: "-4px -6px",
  sm: "-3px -5px",
  xs: "-3px -4px",
};

// outline 모드 size별 padding
const itemOutlinePaddingBySize = {
  lg: vars.scheme.semantic.spacing["12"],
  md: vars.scheme.semantic.spacing["10"],
  sm: vars.scheme.semantic.spacing["8"],
  xs: vars.scheme.semantic.spacing["6"],
} satisfies Record<RadioSize, string>;

// Compound variants
const expansionCompoundVariants = RADIO_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutline: "empty" as const },
  style: {
    selectors: {
      "&::after": { inset: itemInsetBySize[size] },
      "&::before": { inset: itemInsetBySize[size] },
    },
  },
}));

const outlinePaddingCompoundVariants = RADIO_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutline: "outline" as const },
  style: { padding: itemOutlinePaddingBySize[size] },
}));

// VE selectors는 & 자신만 타겟할 수 있어 자식 요소 배치에 globalStyle을 사용한다.
// radioItemGrid를 기준 클래스로 삼아 grid 자식의 위치를 정의한다.
const radioItemGrid = style({
  display: "inline-grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
});

globalStyle(`${radioItemGrid} > :nth-child(1)`, {
  gridColumn: "1",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
});
globalStyle(`${radioItemGrid} > :nth-child(2)`, {
  gridColumn: "2",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
});

// Radio.Item 컨테이너가 ::before로 focus ring을 직접 담당하므로 visual span의 것은 숨긴다.
globalStyle(`${radioItemGrid} input[type="radio"]:focus-visible + .visual`, {
  boxShadow: "none !important",
});

// alignRight 변형별 SubLabel(:nth-child(3)) 배치
// recipe 내부 selectors에서 자식을 타겟할 수 없어 별도 style + globalStyle로 분리한다.
const radioItemAlignLeft = style({});
globalStyle(`${radioItemAlignLeft} > :nth-child(3)`, { gridColumn: "2", gridRow: "2" });

const radioItemAlignRight = style({});
globalStyle(`${radioItemAlignRight} > :nth-child(3)`, { gridColumn: "1 / span 2", gridRow: "2" });

const itemBaseStyles = style([
  radioItemGrid,
  overlay,
  focusRing,
  {
    position: "relative",
    vars: { [overlayColor]: vars.color.semantic.interaction.normal },
    selectors: {
      // checked 상태에서 overlay 색상을 accent으로 전환
      '&:has(input[type="radio"]:checked)': {
        vars: { [overlayColor]: vars.color.semantic.accent.neutral },
      },
      // overlay shape: element 경계와 동일. empty 모드에서는 compoundVariants로 확장
      "&::after": { inset: 0, borderRadius: "inherit" },
      // focus ring shape: element 경계와 동일. empty 모드에서는 compoundVariants로 확장
      "&::before": { inset: 0, borderRadius: "inherit" },
    },
  },
]);

/**
 * `Radio.Item` 컨테이너용 VE recipe.
 *
 * @remarks
 * 인터랙션 상태는 `useContainerPressable`이 부여하는 data attribute를 소비한다.
 * - `data-hovered`       → `::after` overlay opacity 0.08
 * - `data-pressed`       → `::after` overlay opacity 0.12
 * - `data-focus-visible` → `::before` focus ring
 * - `data-disabled`      → hover/pressed 억제 + outline border 색상 변경
 *
 * `usePressable` 대신 `useContainerPressable`을 사용하는 이유:
 * `usePressable` 내부의 `useButton`이 `role="button"`을 추가해 자식 `input[type="radio"]`와
 * 시맨틱 충돌을 일으킨다. `useContainerPressable`은 `useButton` 없이 `usePress` + `useFocusRing({ within: true })`
 * 조합으로 role 변경 없이 pressed/focus 상태를 제공한다.
 *
 * 그리드 자식 배치는 VE selectors 제약으로 인해 module-level globalStyle로 처리된다.
 */
export const radioItem = recipe({
  base: itemBaseStyles,
  variants: {
    // size: gap, borderRadius만 결정. overlay 확장은 compoundVariants에서 styleOutline과 교차
    size: itemSizeVariants satisfies Record<RadioSize, unknown>,
    styleOutline: {
      outline: {
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
        selectors: {
          "&[data-disabled]": { borderColor: vars.color.semantic.stroke.alpha.subtler },
          // overlay가 outline border 위에 그려질 때 border를 유지
          "&::after": { border: "inherit" },
        },
      },
      empty: { border: "none", padding: 0 },
    },
    alignRight: {
      left: [radioItemAlignLeft],
      right: [radioItemAlignRight],
    },
  },
  compoundVariants: [...expansionCompoundVariants, ...outlinePaddingCompoundVariants],
});

// Radio.Label / Radio.SubLabel
// disabled 색상은 조상의 [data-disabled] attribute로 제어한다.
// subLabel은 subLabelSizeMap에 따라 size보다 한 단계 작은 typography를 사용한다.

export const radioTextLabel = recipe({
  base: {
    whiteSpace: "nowrap",
    color: vars.color.semantic.object.bold,
    selectors: {
      "[data-disabled] &": { color: vars.color.semantic.object.subtle },
    },
  },
  variants: {
    size: {
      lg: typographyBySize.lg,
      md: typographyBySize.md,
      sm: typographyBySize.sm,
      xs: typographyBySize.xs,
    } satisfies Record<RadioSize, unknown>,
  },
});

export const radioSubLabel = recipe({
  base: {
    whiteSpace: "nowrap",
    color: vars.color.semantic.object.assistive,
    position: "relative",
    zIndex: 10,
    selectors: {
      "[data-disabled] &": { color: vars.color.semantic.object.subtle },
    },
  },
  variants: {
    size: {
      lg: typographyBySize.md,
      md: typographyBySize.sm,
      sm: typographyBySize.xs,
      xs: typographyBySize.xs,
    } satisfies Record<RadioSize, unknown>,
  },
});
