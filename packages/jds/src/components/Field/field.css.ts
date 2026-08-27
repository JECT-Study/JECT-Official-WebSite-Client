import { createVar, style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { FieldStatus } from "./field.types";

export const container = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
});

const FIELD_CONTROL = "[data-field-control]";

const controlDisabledSelector = `${container.classNames.base}:has(${FIELD_CONTROL}:disabled) &`;
const contentDisabledSelector = `&:has(${FIELD_CONTROL}:disabled)`;
const contentReadonlySelector = `&:has(${FIELD_CONTROL}[data-readonly])`;

export const labelContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["4"],
  marginBottom: vars.scheme.semantic.spacing["4"],
});

export const labelMain = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: vars.scheme.semantic.spacing["2"],
});

export const label = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "default",
    selectors: {
      [controlDisabledSelector]: {
        color: vars.color.semantic.object.subtle,
      },
    },
  },
  variants: {
    disabled: {
      true: {
        color: vars.color.semantic.object.subtle,
      },
      false: {
        color: vars.color.semantic.object.neutral,
      },
    },
  },
});

export const requiredMark = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "default",
    marginTop: -2,
    selectors: {
      [controlDisabledSelector]: {
        color: vars.color.semantic.feedback.notifying.alpha.inverse.assistive,
      },
    },
  },
  variants: {
    disabled: {
      true: {
        color: vars.color.semantic.feedback.notifying.alpha.inverse.assistive,
      },
      false: {
        color: vars.color.semantic.feedback.notifying.static.inverse.bold,
      },
    },
  },
});

const contentVars = {
  borderColor: createVar(),
  borderHoverColor: createVar(),
  borderFocusColor: createVar(),
  backgroundColor: createVar(),
} as const;

export const content = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flex: "1 0 0",
    minWidth: 0,
    gap: vars.scheme.semantic.spacing["8"],
    padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
    borderRadius: vars.scheme.semantic.radius["8"],
    borderWidth: vars.scheme.semantic.strokeWeight["1"],
    borderStyle: "solid",
    borderColor: contentVars.borderColor,
    backgroundColor: contentVars.backgroundColor,
    transition: `border-color ${vars.environment.semantic.duration["100"]} ${vars.environment.semantic.motion.fluent}`,
    vars: {
      [contentVars.backgroundColor]: vars.color.semantic.surface.standard,
    },
    selectors: {
      "&::after": {
        inset: 0,
        borderRadius: "inherit",
      },
      "&::before": {
        inset: `calc(-1 * ${vars.scheme.semantic.strokeWeight["1"]})`,
        borderRadius: "inherit",
        transition: `box-shadow ${vars.environment.semantic.duration["100"]} ${vars.environment.semantic.motion.fluent}`,
      },
      "&:hover": {
        borderColor: contentVars.borderHoverColor,
      },
      "&:focus-within": {
        borderColor: contentVars.borderFocusColor,
      },
      // 상태는 루트(컨텍스트)뿐 아니라 컨트롤에서도 덮어쓸 수 있으므로, 컨테이너가 실제 컨트롤 상태를 함께 반영하도록 native 상태를 읽는다.
      [contentDisabledSelector]: {
        pointerEvents: "none",
      },
      // native :read-only는 type에 따라 오탐할 수 있어 컨트롤이 내려준 data 속성을 사용한다.
      [contentReadonlySelector]: {
        vars: { [contentVars.backgroundColor]: vars.color.semantic.fill.subtlest },
      },
    },
  },
  variants: {
    status: {
      default: {
        vars: {
          [contentVars.borderColor]: vars.color.semantic.stroke.alpha.assistive,
          [contentVars.borderHoverColor]: vars.color.semantic.accent.normal,
          [contentVars.borderFocusColor]: vars.color.semantic.accent.normal,
        },
        selectors: {
          [contentDisabledSelector]: {
            vars: { [contentVars.borderColor]: vars.color.semantic.stroke.alpha.subtle },
          },
        },
      },
      success: {
        vars: {
          [contentVars.borderColor]: vars.color.semantic.feedback.positive.alpha.alternative,
          [contentVars.borderHoverColor]: vars.color.semantic.feedback.positive.normal,
          [contentVars.borderFocusColor]: vars.color.semantic.feedback.positive.normal,
        },
        selectors: {
          [contentDisabledSelector]: {
            vars: { [contentVars.borderColor]: vars.color.semantic.feedback.positive.alpha.subtle },
          },
        },
      },
      error: {
        vars: {
          [contentVars.borderColor]: vars.color.semantic.feedback.destructive.alpha.alternative,
          [contentVars.borderHoverColor]: vars.color.semantic.feedback.destructive.normal,
          [contentVars.borderFocusColor]: vars.color.semantic.feedback.destructive.normal,
        },
        selectors: {
          [contentDisabledSelector]: {
            vars: {
              [contentVars.borderColor]: vars.color.semantic.feedback.destructive.alpha.subtle,
            },
          },
        },
      },
    } satisfies Record<FieldStatus, StyleRule>,
    readOnly: {
      true: {
        vars: { [contentVars.backgroundColor]: vars.color.semantic.fill.subtlest },
      },
      false: {},
    },
    disabled: {
      true: {
        pointerEvents: "none",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { disabled: true, status: "default" },
      style: { vars: { [contentVars.borderColor]: vars.color.semantic.stroke.alpha.subtle } },
    },
    {
      variants: { disabled: true, status: "error" },
      style: {
        vars: { [contentVars.borderColor]: vars.color.semantic.feedback.destructive.alpha.subtle },
      },
    },
    {
      variants: { disabled: true, status: "success" },
      style: {
        vars: { [contentVars.borderColor]: vars.color.semantic.feedback.positive.alpha.subtle },
      },
    },
  ],
});

const disabledSupportTextColor = {
  default: vars.color.semantic.object.subtle,
  success: vars.color.semantic.feedback.positive.alpha.assistive,
  error: vars.color.semantic.feedback.destructive.alpha.assistive,
} satisfies Record<FieldStatus, string>;

const disabledSupportTextSelector = (status: FieldStatus) => ({
  [controlDisabledSelector]: {
    color: disabledSupportTextColor[status],
  },
});

// 박스 아래 첫 요소만 margin-top을 갖는다. Footer 처럼 여러 요소를 묶는 경우 래퍼가 받고 그 자식은 받지 않는다.
// belowContent를 합성하지 않은 요소가 사이에 들어가면 간격이 사라진다.
export const belowContent = style({
  selectors: {
    [`${content.classNames.base} + &`]: {
      marginTop: vars.scheme.semantic.spacing["6"],
    },
  },
});

export const footer = style([
  belowContent,
  {
    display: "flex",
    alignItems: "flex-start",
    gap: vars.scheme.semantic.spacing["8"],
  },
]);

export const supportText = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "default",
  },
  variants: {
    status: {
      default: {
        color: vars.color.semantic.object.alternative,
        selectors: disabledSupportTextSelector("default"),
      },
      success: {
        color: vars.color.semantic.feedback.positive.normal,
        selectors: disabledSupportTextSelector("success"),
      },
      error: {
        color: vars.color.semantic.feedback.destructive.normal,
        selectors: disabledSupportTextSelector("error"),
      },
    } satisfies Record<FieldStatus, StyleRule>,
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { disabled: true, status: "default" },
      style: { color: vars.color.semantic.object.subtle },
    },
    {
      variants: { disabled: true, status: "success" },
      style: { color: vars.color.semantic.feedback.positive.alpha.assistive },
    },
    {
      variants: { disabled: true, status: "error" },
      style: {
        color: vars.color.semantic.feedback.destructive.alpha.assistive,
      },
    },
  ],
});
