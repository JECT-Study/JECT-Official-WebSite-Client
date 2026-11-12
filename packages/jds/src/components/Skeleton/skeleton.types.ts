import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { vars } from "tokens";

export type SkeletonRadius = keyof typeof vars.scheme.semantic.radius;

export interface SkeletonProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "dangerouslySetInnerHTML" | "contentEditable" | "tabIndex" | "aria-hidden"
> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: SkeletonRadius;
}
