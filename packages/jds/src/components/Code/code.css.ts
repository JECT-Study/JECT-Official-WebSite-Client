import { style } from "@vanilla-extract/css";
import { vars } from "tokens";

export const code = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.scheme.semantic.spacing["0"]} ${vars.scheme.semantic.spacing["6"]}`,
  borderRadius: vars.scheme.semantic.radius["4"],
  background: vars.color.semantic.fill.subtlest,
  boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${vars.color.semantic.stroke.alpha.assistive}`,
  color: vars.color.semantic.object.bold,
  cursor: "text",
  "@media": {
    // 고대비 모드는 box-shadow를 지우므로 테두리를 border로 되살린다.
    "(forced-colors: active)": {
      border: `${vars.scheme.semantic.strokeWeight["1"]} solid currentColor`,
    },
  },
});
