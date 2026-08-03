import { createVar, style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { FieldStatus, FieldStyle } from "./field.types";
import { labelColorVar } from "../../utils/typography.css";

export const container = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
});

const controlDisabledSelector = `${container.classNames.base}:has(:is(input, [data-interaction-target]):disabled) &`;

export const labelContainer = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: vars.scheme.semantic.spacing["4"],
  },
  variants: {
    fieldStyle: {
      outline: {
        marginBottom: vars.scheme.semantic.spacing["4"],
      },
      hollow: {
        marginBottom: vars.scheme.semantic.spacing["10"],
      },
    } satisfies Record<FieldStyle, StyleRule>,
  },
});

export const labelMain = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: vars.scheme.semantic.spacing["2"],
});

export const label = recipe({
  base: {
    selectors: {
      [controlDisabledSelector]: {
        vars: { [labelColorVar]: vars.color.semantic.object.subtle },
      },
    },
  },
  variants: {
    disabled: {
      true: {
        vars: { [labelColorVar]: vars.color.semantic.object.subtle },
      },
      false: {
        vars: { [labelColorVar]: vars.color.semantic.object.neutral },
      },
    },
  },
});

export const asterisk = recipe({
  base: {
    marginTop: -2,
    selectors: {
      [controlDisabledSelector]: {
        vars: { [labelColorVar]: vars.color.semantic.feedback.notifying.alpha.inverse.assistive },
      },
    },
  },
  variants: {
    disabled: {
      true: {
        vars: { [labelColorVar]: vars.color.semantic.feedback.notifying.alpha.inverse.assistive },
      },
      false: {
        vars: { [labelColorVar]: vars.color.semantic.feedback.notifying.static.inverse.bold },
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
    borderRadius: vars.scheme.semantic.radius["8"],
    transition: `border-color ${vars.environment.semantic.duration["100"]} ${vars.environment.semantic.motion.fluent}`,
    selectors: {
      // NOTES: 상태는 루트(컨텍스트)뿐 아니라 안쪽 input 에서도 덮어쓸 수 있으므로, 컨테이너가 실제 컨트롤 상태를 함께 반영하도록 native 상태를 읽는다.
      "&:has(:is(input, [data-interaction-target]):disabled)": {
        pointerEvents: "none",
      },
    },
  },
  variants: {
    fieldStyle: {
      outline: {
        padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
        borderWidth: vars.scheme.semantic.strokeWeight["1"],
        borderStyle: "solid",
        borderColor: contentVars.borderColor,
        backgroundColor: contentVars.backgroundColor,
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
          // NOTES: readonly 는 native `:read-only` 가 type 에 따라 오탐하므로 TextField.Input 이 해석해 내려주는 data 속성을 읽는다.
          "&:has(:is(input, [data-interaction-target])[data-readonly])": {
            vars: { [contentVars.backgroundColor]: vars.color.semantic.fill.subtlest },
          },
        },
      },
      hollow: {},
    } satisfies Record<FieldStyle, StyleRule>,
    status: {
      default: {},
      success: {},
      error: {},
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
      variants: { fieldStyle: "outline", status: "default" },
      style: {
        vars: {
          [contentVars.borderColor]: vars.color.semantic.stroke.alpha.assistive,
          [contentVars.borderHoverColor]: vars.color.semantic.accent.normal,
          [contentVars.borderFocusColor]: vars.color.semantic.accent.normal,
        },
        selectors: {
          "&:has(:is(input, [data-interaction-target]):disabled)": {
            vars: { [contentVars.borderColor]: vars.color.semantic.stroke.alpha.subtle },
          },
        },
      },
    },
    {
      variants: { fieldStyle: "outline", status: "success" },
      style: {
        vars: {
          [contentVars.borderColor]: vars.color.semantic.feedback.positive.alpha.alternative,
          [contentVars.borderHoverColor]: vars.color.semantic.feedback.positive.normal,
          [contentVars.borderFocusColor]: vars.color.semantic.feedback.positive.normal,
        },
        selectors: {
          "&:has(:is(input, [data-interaction-target]):disabled)": {
            vars: {
              [contentVars.borderColor]: vars.color.semantic.feedback.positive.alpha.subtle,
            },
          },
        },
      },
    },
    {
      variants: { fieldStyle: "outline", status: "error" },
      style: {
        vars: {
          [contentVars.borderColor]: vars.color.semantic.feedback.destructive.alpha.alternative,
          [contentVars.borderHoverColor]: vars.color.semantic.feedback.destructive.normal,
          [contentVars.borderFocusColor]: vars.color.semantic.feedback.destructive.normal,
        },
        selectors: {
          "&:has(:is(input, [data-interaction-target]):disabled)": {
            vars: {
              [contentVars.borderColor]: vars.color.semantic.feedback.destructive.alpha.subtle,
            },
          },
        },
      },
    },
    {
      variants: { fieldStyle: "outline", disabled: true, status: "default" },
      style: { vars: { [contentVars.borderColor]: vars.color.semantic.stroke.alpha.subtle } },
    },
    {
      variants: { fieldStyle: "outline", disabled: true, status: "error" },
      style: {
        vars: { [contentVars.borderColor]: vars.color.semantic.feedback.destructive.alpha.subtle },
      },
    },
    {
      variants: { fieldStyle: "outline", disabled: true, status: "success" },
      style: {
        vars: { [contentVars.borderColor]: vars.color.semantic.feedback.positive.alpha.subtle },
      },
    },
  ],
});

const disabledHelperTextColor = {
  default: vars.color.semantic.object.subtle,
  success: vars.color.semantic.feedback.positive.alpha.assistive,
  error: vars.color.semantic.feedback.destructive.alpha.assistive,
} satisfies Record<FieldStatus, string>;

const disabledHelperTextSelector = (status: FieldStatus) => ({
  [controlDisabledSelector]: {
    vars: { [labelColorVar]: disabledHelperTextColor[status] },
  },
});

export const helperText = recipe({
  base: {},
  variants: {
    fieldStyle: {
      outline: { marginTop: vars.scheme.semantic.spacing["6"] },
      hollow: { marginTop: vars.scheme.semantic.spacing["12"] },
    } satisfies Record<FieldStyle, StyleRule>,
    status: {
      default: {
        vars: { [labelColorVar]: vars.color.semantic.object.alternative },
        selectors: disabledHelperTextSelector("default"),
      },
      success: {
        vars: { [labelColorVar]: vars.color.semantic.feedback.positive.normal },
        selectors: disabledHelperTextSelector("success"),
      },
      error: {
        vars: { [labelColorVar]: vars.color.semantic.feedback.destructive.normal },
        selectors: disabledHelperTextSelector("error"),
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
      style: { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
    },
    {
      variants: { disabled: true, status: "success" },
      style: { vars: { [labelColorVar]: vars.color.semantic.feedback.positive.alpha.assistive } },
    },
    {
      variants: { disabled: true, status: "error" },
      style: {
        vars: { [labelColorVar]: vars.color.semantic.feedback.destructive.alpha.assistive },
      },
    },
  ],
});
