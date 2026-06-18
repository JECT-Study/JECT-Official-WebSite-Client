import { clsx } from "clsx";
import { forwardRef } from "react";

import { tableHeaderItem, tableHeaderLabel } from "./table.css";
import type { TableHeaderItemProps } from "../Table.types";

import { getLabelClassName } from "@/utils/typography";

export const TableHeaderItem = forwardRef<HTMLTableCellElement, TableHeaderItemProps>(
  ({ children, className, style, width, hasDivider = true, ...restProps }, ref) => (
    <th
      ref={ref}
      scope='col'
      className={clsx(tableHeaderItem({ hasDivider }), className)}
      style={{ width, ...style }}
      {...restProps}
    >
      <span className={clsx(getLabelClassName(), tableHeaderLabel)}>{children}</span>
    </th>
  ),
);

TableHeaderItem.displayName = "TableHeaderItem";
