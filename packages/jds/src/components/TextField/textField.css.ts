import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

const inputTextColor = createVar();

export const input = recipe({
  base: {
    flex: "1 0 0",
    minWidth: 0,
    padding: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    position: "relative",
    zIndex: 1,
    color: fallbackVar(inputTextColor, vars.color.semantic.object.boldest),
    "::placeholder": {
      color: vars.color.semantic.object.assistive,
    },
  },
  variants: {
    disabled: {
      true: {},
      false: {},
    },
    readOnly: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { disabled: false, readOnly: true },
      style: { vars: { [inputTextColor]: vars.color.semantic.object.subtle } },
    },
    {
      variants: { disabled: true },
      style: { vars: { [inputTextColor]: vars.color.semantic.object.assistive } },
    },
  ],
});
