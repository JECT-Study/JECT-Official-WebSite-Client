import { clsx } from "clsx";
import { forwardRef } from "react";

import { tableRoot } from "./table.css";
import type { TableProps } from "../table.types";

export const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <table ref={ref} className={clsx(tableRoot, className)} {...restProps}>
        {children}
      </table>
    );
  },
);

TableRoot.displayName = "Table.Root";
