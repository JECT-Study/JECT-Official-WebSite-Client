import { StyledTableRow } from "./Table.styles";
import type { TableRowProps } from "../Table.types";

export const TableRow = ({ children, ...restProps }: TableRowProps) => {
  return <StyledTableRow {...restProps}>{children}</StyledTableRow>;
};

TableRow.displayName = "TableRow";
