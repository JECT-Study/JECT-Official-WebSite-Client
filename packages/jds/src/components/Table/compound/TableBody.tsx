import { forwardRef } from "react";

import type { TableBodyProps } from "../Table.types";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tbody ref={ref} className={className} {...restProps}>
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = "Table.Body";
