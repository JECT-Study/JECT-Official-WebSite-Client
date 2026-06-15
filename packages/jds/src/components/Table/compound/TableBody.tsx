import { clsx } from "clsx";
import { forwardRef } from "react";

import { tableBody } from "./table.css";
import type { TableBodyProps } from "../Table.types";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tbody ref={ref} className={clsx(tableBody, className)} {...restProps}>
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = "TableBody";
