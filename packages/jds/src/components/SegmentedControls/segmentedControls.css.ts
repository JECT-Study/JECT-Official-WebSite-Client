import { recipe } from "@vanilla-extract/recipes";

import type { SegmentedControlsSize } from "./segmentedControls.types";
import { vars } from "../../tokens/vars.css";
import { focusRing } from "../../utils/focusRing.css";
import { overlay } from "../../utils/overlay.css";

export const root = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.scheme.semantic.spacing["2"],
    minWidth: 0,
    width: "100%",
    background: vars.color.semantic.fill.subtlest,
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
    borderRadius: vars.scheme.semantic.radius["8"],
    padding: vars.scheme.semantic.spacing["2"],
  },
});

export const item = recipe({
  base: [
    overlay({ density: "normal", hierarchy: "secondary", nativeHover: true }),
    focusRing(),
    {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      minWidth: 0,
      gap: vars.scheme.semantic.spacing["4"],
      border: `${vars.scheme.semantic.strokeWeight["1"]} solid transparent`,
      borderRadius: vars.scheme.semantic.radius["6"],
      background: "transparent",
      color: vars.color.semantic.object.alternative,
      cursor: "pointer",
      fontFamily: "inherit",
      userSelect: "none",
      selectors: {
        "&::before, &::after": {
          inset: 0,
          borderRadius: "inherit",
        },
        '&[data-state="checked"]': {
          borderColor: vars.color.semantic.stroke.alpha.subtle,
          background: vars.color.semantic.surface.shallowest,
          boxShadow: vars.environment.semantic.shadow.embossed,
          color: vars.color.semantic.object.bolder,
        },
        '&[data-state="checked"]::before, &[data-state="checked"]::after': {
          inset: "-1px",
        },
        "&:disabled, &[data-disabled]": {
          color: vars.color.semantic.object.subtle,
          cursor: "not-allowed",
        },
        '&[data-state="checked"]:disabled, &[data-state="checked"][data-disabled]': {
          borderColor: vars.color.semantic.stroke.alpha.subtler,
          background: vars.color.semantic.surface.shallower,
        },
      },
    },
  ],
  variants: {
    size: {
      lg: {
        padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["16"]}`,
      },
      md: {
        padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["12"]}`,
      },
      sm: {
        padding: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]}`,
      },
      xs: {
        padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["8"]}`,
      },
    } satisfies Record<SegmentedControlsSize, object>,
  },
});

export const itemLabel = recipe({
  base: {
    flex: "1 0 0",
    minWidth: 0,
    overflow: "hidden",
    color: "inherit",
    cursor: "inherit",
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      lg: "semantic-textStyle-label-lg-normal",
      md: "semantic-textStyle-label-md-normal",
      sm: "semantic-textStyle-label-sm-normal",
      xs: "semantic-textStyle-label-xs-normal",
    } satisfies Record<SegmentedControlsSize, string>,
  },
});
