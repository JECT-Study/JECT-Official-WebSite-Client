import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { IconSize } from "components";
import { vars } from "tokens";
import { pxToRem, overlay, overlayColorMap, labelTypographyVars } from "utils";

import { CHECKBOX_SIZE_OPTIONS, type CheckboxSize } from "./checkbox.types";

const checkboxSizeMap: Record<CheckboxSize, { sizeRem: string; iconSize: IconSize }> = {
  lg: { sizeRem: pxToRem(20), iconSize: "md" },
  md: { sizeRem: pxToRem(18), iconSize: "sm" },
  sm: { sizeRem: pxToRem(16), iconSize: "xs" },
  xs: { sizeRem: pxToRem(14), iconSize: "2xs" },
};

export const checkboxGroupWrapper = style({ display: "contents" });

// Checkbox.Basic

export const checkboxInput = style({
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

export const checkboxRootLabel = style({
  display: "inline-flex",
  position: "relative",
});

// 호출자는 className에 "visual" 리터럴을 반드시 함께 부여해야 한다. checkboxItem globalStyle이 이 클래스명에 의존한다.
// invalid 셀렉터는 valid보다 명시도가 높아 차이나는 프로퍼티만 선언한다.
export const checkboxVisual = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    borderRadius: vars.scheme.semantic.radius["4"],
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: vars.color.semantic.surface.shallow,
    color: "transparent",
    cursor: "pointer",
    position: "relative",
    outline: "none",
    selectors: {
      'input[type="checkbox"]:not(:disabled):checked + &': {
        backgroundColor: vars.color.semantic.accent.neutral,
        border: "none",
        color: vars.color.semantic.object.static.inverse.boldest,
      },
      'input[type="checkbox"]:not(:disabled):indeterminate + &': {
        backgroundColor: vars.color.semantic.accent.neutral,
        border: "none",
        color: vars.color.semantic.object.static.inverse.boldest,
      },
      'input[type="checkbox"]:disabled:not(:checked):not(:indeterminate) + &': {
        backgroundColor: vars.color.semantic.surface.standard,
        borderColor: vars.color.semantic.stroke.alpha.subtle,
        cursor: "not-allowed",
      },
      'input[type="checkbox"]:disabled:checked + &': {
        backgroundColor: vars.color.semantic.fill.subtlest,
        border: "none",
        color: vars.color.semantic.object.subtle,
        cursor: "not-allowed",
      },
      'input[type="checkbox"]:disabled:indeterminate + &': {
        backgroundColor: vars.color.semantic.fill.subtlest,
        border: "none",
        color: vars.color.semantic.object.subtle,
        cursor: "not-allowed",
      },
      // focusRing 유틸은 자기 자신의 focus 기준이므로 형제 input의 :focus-visible에 반응해야 하는 여기선 직접 선언한다.
      'input[type="checkbox"]:focus-visible + &': {
        boxShadow: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
      },
      '[data-invalid] input[type="checkbox"]:not(:disabled):focus-visible + &': {
        boxShadow: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.feedback.destructive.alpha.alternative}`,
      },
      '[data-invalid] input[type="checkbox"]:not(:disabled) + &': {
        borderColor: vars.color.semantic.feedback.destructive.neutral,
      },
      '[data-invalid] input[type="checkbox"]:disabled + &': {
        borderColor: vars.color.semantic.feedback.destructive.alpha.subtle,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: overlayColorMap.primary,
        borderRadius: "inherit",
        opacity: 0,
        pointerEvents: "none",
      },
      "&:hover::after": { opacity: 0.08 },
      "&:active::after": { opacity: 0.12 },
    },
  },
  variants: {
    size: {
      lg: { width: checkboxSizeMap.lg.sizeRem, height: checkboxSizeMap.lg.sizeRem },
      md: { width: checkboxSizeMap.md.sizeRem, height: checkboxSizeMap.md.sizeRem },
      sm: { width: checkboxSizeMap.sm.sizeRem, height: checkboxSizeMap.sm.sizeRem },
      xs: { width: checkboxSizeMap.xs.sizeRem, height: checkboxSizeMap.xs.sizeRem },
    } satisfies Record<CheckboxSize, unknown>,
  },
});

// Checkbox.Item

const itemInsetBySize: Record<CheckboxSize, string> = {
  lg: `${pxToRem(-4)} ${pxToRem(-8)}`,
  md: `${pxToRem(-4)} ${pxToRem(-8)}`,
  sm: `${pxToRem(-4)} ${pxToRem(-6)}`,
  xs: `${pxToRem(-3)} ${pxToRem(-6)}`,
};

const itemOutlinedPaddingBySize = {
  lg: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["12"]}`,
  md: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["10"]}`,
  sm: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
  xs: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["6"]}`,
} satisfies Record<CheckboxSize, string>;

const expansionCompoundVariants = CHECKBOX_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutlined: "hollow" as const },
  style: {
    selectors: {
      "&::after": { inset: itemInsetBySize[size] },
      "&::before": { inset: itemInsetBySize[size] },
    },
  },
}));

const outlinedPaddingCompoundVariants = CHECKBOX_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutlined: "outlined" as const },
  style: { padding: itemOutlinedPaddingBySize[size] },
}));

const checkboxItemGrid = style({
  display: "inline-grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
});

export const checkboxControlSlot = style({ gridColumn: "1", gridRow: "1", alignItems: "center" });
export const checkboxLabelSlot = style({
  gridColumn: "2",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
});
export const checkboxHelperSlot = style({ gridColumn: "2", gridRow: "2" });

// Checkbox.Item 컨테이너의 ::before가 focus ring을 담당하므로 visual 자체의 focus ring을 숨긴다.
globalStyle(`${checkboxItemGrid} input[type="checkbox"]:focus-visible + .visual`, {
  boxShadow: "none !important",
});

// data-invalid는 useContainerPressable이 아닌 컴포넌트에서 직접 부여한다.
export const checkboxItem = recipe({
  base: [
    // focus ring은 invalid 상태에서 색이 달라지므로 Checkbox.tsx에서 focusRing({ feedback })으로 부여한다.
    checkboxItemGrid,
    overlay(),
    {
      position: "relative",
      selectors: {
        "&::after": { inset: 0, borderRadius: "inherit" },
        "&::before": { inset: 0, borderRadius: "inherit" },
      },
    },
  ],
  variants: {
    size: {
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
    } satisfies Record<CheckboxSize, object>,
    styleOutlined: {
      outlined: {
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
        selectors: {
          "&[data-disabled]": { borderColor: vars.color.semantic.stroke.alpha.subtler },
          "&[data-invalid]": {
            borderColor: vars.color.semantic.feedback.destructive.neutral,
          },
          "&[data-invalid][data-disabled]": {
            borderColor: vars.color.semantic.feedback.destructive.alpha.subtle,
          },
          "&::after": { border: "inherit" },
        },
      },
      hollow: { border: "none", padding: 0 },
    },
  },
  compoundVariants: [...expansionCompoundVariants, ...outlinedPaddingCompoundVariants],
});

// Checkbox.Label / Checkbox.Helper
// disabled 및 invalid 색상은 조상의 data attribute로 제어한다.

export const checkboxTextLabel = recipe({
  base: {
    whiteSpace: "nowrap",
    color: vars.color.semantic.object.bolder,
    selectors: {
      "[data-disabled] &": { color: vars.color.semantic.object.subtle },
    },
  },
  variants: {
    size: {
      lg: labelTypographyVars.normal.lg,
      md: labelTypographyVars.normal.md,
      sm: labelTypographyVars.normal.sm,
      xs: labelTypographyVars.normal.xs,
    } satisfies Record<CheckboxSize, unknown>,
  },
});

export const checkboxHelper = recipe({
  base: {
    whiteSpace: "nowrap",
    color: vars.color.semantic.object.alternative,
    position: "relative",
    zIndex: 10,
    selectors: {
      "[data-disabled] &": { color: vars.color.semantic.object.subtle },
      "[data-invalid] &": { color: vars.color.semantic.feedback.destructive.normal },
      "[data-invalid][data-disabled] &": {
        color: vars.color.semantic.feedback.destructive.alpha.assistive,
      },
    },
  },
  variants: {
    size: {
      lg: labelTypographyVars.subtle.sm,
      md: labelTypographyVars.subtle.sm,
      sm: labelTypographyVars.subtle.xs,
      xs: labelTypographyVars.subtle.xs,
    } satisfies Record<CheckboxSize, unknown>,
  },
});
