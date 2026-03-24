import type { TableHeaderProps } from "../Table.types";
import { StyledTableHeader } from "./Table.styles";

export const TableHeader = ({ children }: Pick<TableHeaderProps, "children">) => (
  <StyledTableHeader>{children}</StyledTableHeader>
);

TableHeader.displayName = "TableHeader";
