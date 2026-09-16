import type { ComponentPropsWithoutRef } from "react";

export const CELL_STATUS_OPTIONS = ["normal", "current", "selected"] as const;

export type CellStatus = (typeof CELL_STATUS_OPTIONS)[number];

export type CellProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  "data-part"?: never;
  date: Date;
  status?: CellStatus;
  outsideMonth?: boolean;
};
