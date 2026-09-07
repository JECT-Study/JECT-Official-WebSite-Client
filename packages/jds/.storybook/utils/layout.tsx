import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { ComponentPropsWithoutRef } from "react";

import { flexColumn, flexRow, gapVar, label } from "./layout.css";

type WithGap = { gap?: string };

export function FlexRow({
  gap = "16px",
  style,
  ...props
}: ComponentPropsWithoutRef<"div"> & WithGap) {
  return (
    <div
      className={flexRow}
      style={{ ...assignInlineVars({ [gapVar]: gap }), ...style }}
      {...props}
    />
  );
}

export function FlexColumn({
  gap = "24px",
  style,
  ...props
}: ComponentPropsWithoutRef<"div"> & WithGap) {
  return (
    <div
      className={flexColumn}
      style={{ ...assignInlineVars({ [gapVar]: gap }), ...style }}
      {...props}
    />
  );
}

export function Label({ ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={label} {...props} />;
}
