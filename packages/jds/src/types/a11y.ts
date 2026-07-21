export type AriaLabelProps =
  | { "aria-label"?: string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby"?: string };
