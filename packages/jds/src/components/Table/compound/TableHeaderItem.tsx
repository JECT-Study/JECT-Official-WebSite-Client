import { clsx } from "clsx";
import { forwardRef } from "react";

import { tableHeaderItem, tableHeaderLabel } from "./table.css";
import type { TableHeaderProps } from "../Table.types";

import { getLabelClassName } from "@/utils/typography";

export const TableHeaderItem = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ children, className, style, width, hasDivider = true, ...restProps }, ref) => (
    <th
      ref={ref}
      className={clsx(tableHeaderItem({ hasDivider }), className)}
      style={{ width, ...style }}
      {...restProps}
    >
      <span className={clsx(getLabelClassName(), tableHeaderLabel)}>{children}</span>
    </th>
  ),
);

TableHeaderItem.displayName = "TableHeaderItem";
