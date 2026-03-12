import { forwardRef } from "react";

import { StyledTableRoot } from "./Table.styles";
import type { TableProps } from "../Table.types";

export const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledTableRoot ref={ref} {...restProps}>
        {children}
      </StyledTableRoot>
    );
  },
);

TableRoot.displayName = "TableRoot";
