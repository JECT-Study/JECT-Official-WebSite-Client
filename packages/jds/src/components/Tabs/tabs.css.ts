import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay } from "utils";

import type { TabsVariant } from "./tabs.types";

export const label = style({
  color: "inherit",
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
    overlay({ hierarchy: "secondary", density: "normal", nativeHover: true }),
    {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: vars.scheme.semantic.spacing["4"],
      minWidth: 0,
      appearance: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
      userSelect: "none",
      color: vars.color.semantic.object.alternative,
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
        border: "none",
        borderBottom: `${vars.scheme.semantic.strokeWeight["2"]} solid transparent`,
        borderRadius: 0,
        backgroundColor: "transparent",
        selectors: {
          "&::after": {
            // header trigger의 borderBottom 두께와 overlay 위치를 동기화하기 위해 같은 strokeWeight 토큰을 재사용
            bottom: `calc(${vars.scheme.semantic.strokeWeight["2"]} * -1)`,
          },
          "&[data-state='active']": {
            color: vars.color.semantic.object.bolder,
            borderBottomColor: vars.color.semantic.stroke.bold,
            zIndex: 1,
          },
          "&:disabled, &[data-disabled]": {
            color: vars.color.semantic.object.subtle,
          },
          "&:disabled[data-state='active'], &[data-disabled][data-state='active']": {
            color: vars.color.semantic.object.subtle,
            borderBottomColor: vars.color.semantic.stroke.subtle,
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
            color: vars.color.semantic.object.bolder,
            backgroundColor: vars.color.semantic.fill.subtlest,
          },
          "&:disabled, &[data-disabled]": {
            color: vars.color.semantic.object.subtle,
            borderColor: vars.color.semantic.stroke.alpha.subtler,
          },
          "&:disabled[data-state='active'], &[data-disabled][data-state='active']": {
            color: vars.color.semantic.object.subtle,
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
