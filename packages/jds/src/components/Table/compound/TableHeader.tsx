import { clsx } from "clsx";
import { forwardRef } from "react";

import { tableHeader } from "./table.css";
import type { TableHeaderSectionProps } from "../Table.types";

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderSectionProps>(
  ({ children, className, rowProps, ...restProps }, ref) => (
    <thead ref={ref} className={clsx(tableHeader, className)} {...restProps}>
      <tr {...rowProps}>{children}</tr>
    </thead>
  ),
);

TableHeader.displayName = "TableHeader";
