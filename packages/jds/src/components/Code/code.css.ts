import { style } from "@vanilla-extract/css";
import { vars } from "tokens";

export const code = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.scheme.semantic.spacing["0"]} ${vars.scheme.semantic.spacing["6"]}`,
  borderRadius: vars.scheme.semantic.radius["4"],
  background: vars.color.semantic.fill.subtlest,
  border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
  color: vars.color.semantic.object.bold,
  cursor: "text",
});
