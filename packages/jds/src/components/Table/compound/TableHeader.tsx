import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { tableHeader } from "./table.css";

export const TableHeader = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"thead">>(
  ({ children, className, ...restProps }, ref) => (
    <thead ref={ref} className={clsx(tableHeader, className)} {...restProps}>
      <tr>{children}</tr>
    </thead>
  ),
);

TableHeader.displayName = "TableHeader";
