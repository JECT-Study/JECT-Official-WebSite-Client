import { clsx } from "clsx";
import { forwardRef } from "react";

import { tableRow } from "./table.css";
import type { TableRowProps } from "../table.types";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr ref={ref} className={clsx(tableRow, className)} {...restProps}>
        {children}
      </tr>
    );
  },
);

TableRow.displayName = "Table.Row";
