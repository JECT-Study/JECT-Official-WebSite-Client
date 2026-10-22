import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay } from "utils";

import type { TabsVariant } from "./tabs.types";

const labelColor = createVar();
const badgeColorVar = createVar();
const underlineColor = createVar();

export const label = style({
  display: "flex",
  alignItems: "center",
  color: labelColor,
  cursor: "inherit",
});

export const badge = style({
  display: "flex",
  alignItems: "center",
  color: badgeColorVar,
  cursor: "inherit",
});

export const content = style([
  focusRing(),
  {
    position: "relative",
    borderRadius: vars.scheme.semantic.radius["6"],
    selectors: {
      "&::before": {
        inset: 0,
        borderRadius: "inherit",
      },
    },
  },
]);

export const list = recipe({
  base: {
    display: "flex",
  },
  variants: {
    variant: {
      header: {
        gap: 0,
        borderBottom: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.assistive}`,
      },
      content: {
        gap: vars.scheme.semantic.spacing["8"],
      },
    } satisfies Record<TabsVariant, object>,
  },
});

export const trigger = recipe({
  base: [
    focusRing(),
    overlay({ hierarchy: "secondary", density: "bold" }),
    {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: vars.scheme.semantic.spacing["2"],
      minWidth: 0,
      appearance: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
      userSelect: "none",
      vars: {
        [labelColor]: vars.color.semantic.object.alternative,
        [badgeColorVar]: vars.color.semantic.object.alternative,
      },
      selectors: {
        "&::before, &::after": {
          inset: 0,
          borderRadius: "inherit",
        },
        "&:disabled, &[data-disabled]": {
          cursor: "default",
          pointerEvents: "none",
        },
      },
    },
  ],
  variants: {
    variant: {
      header: {
        padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
        // header list의 baseline 위에 active underline을 겹치기 위해 같은 strokeWeight 토큰을 재사용
        marginBottom: `calc(${vars.scheme.semantic.strokeWeight["1"]} * -1)`,
        border: "none",
        // 밑줄이 박스 크기를 늘리지 않도록 inset box-shadow로 안쪽 아래에 그린다.
        boxShadow: `inset 0 calc(${vars.scheme.semantic.strokeWeight["2"]} * -1) 0 0 ${underlineColor}`,
        borderRadius: 0,
        backgroundColor: "transparent",
        vars: {
          [underlineColor]: "transparent",
        },
        "@media": {
          // 고대비 모드는 box-shadow를 지우므로 선택된 탭의 밑줄만 border로 되살린다.
          "(forced-colors: active)": {
            selectors: {
              "&[data-state='active']": {
                borderBottom: `${vars.scheme.semantic.strokeWeight["2"]} solid currentColor`,
              },
            },
          },
        },
        selectors: {
          "&::before": {
            // focus ring이 밑줄과 겹치도록 ::before를 밑줄 두께만큼 위로 올려 그린다.
            bottom: vars.scheme.semantic.strokeWeight["2"],
          },
          "&[data-state='active']": {
            vars: {
              [labelColor]: vars.color.semantic.object.bolder,
              [badgeColorVar]: vars.color.semantic.object.bold,
              [underlineColor]: vars.color.semantic.stroke.bold,
            },
            zIndex: 1,
          },
          "&:disabled, &[data-disabled]": {
            vars: {
              [labelColor]: vars.color.semantic.object.subtle,
              [badgeColorVar]: vars.color.semantic.object.subtle,
            },
          },
          "&:disabled[data-state='active'], &[data-disabled][data-state='active']": {
            vars: {
              [labelColor]: vars.color.semantic.object.subtle,
              [badgeColorVar]: vars.color.semantic.object.subtle,
              [underlineColor]: vars.color.semantic.stroke.assistive,
            },
          },
        },
      },
      content: {
        padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
        borderRadius: vars.scheme.semantic.radius["6"],
        backgroundColor: "transparent",
        selectors: {
          "&[data-state='active']": {
            vars: {
              [labelColor]: vars.color.semantic.object.bolder,
              [badgeColorVar]: vars.color.semantic.object.bold,
            },
            backgroundColor: vars.color.semantic.fill.subtlest,
          },
          "&:disabled, &[data-disabled]": {
            vars: {
              [labelColor]: vars.color.semantic.object.subtle,
              [badgeColorVar]: vars.color.semantic.object.subtle,
            },
            borderColor: vars.color.semantic.stroke.alpha.subtler,
          },
          "&:disabled[data-state='active'], &[data-disabled][data-state='active']": {
            vars: {
              [labelColor]: vars.color.semantic.object.subtle,
              [badgeColorVar]: vars.color.semantic.object.subtle,
            },
            backgroundColor: vars.color.semantic.fill.subtlest,
            borderColor: vars.color.semantic.stroke.alpha.subtler,
          },
        },
      },
    } satisfies Record<TabsVariant, object>,
    isItemStretched: {
      false: {
        flex: "0 0 auto",
      },
      true: {
        flex: "1 1 0%",
      },
    },
  },
});
