import { StyledTableHeaderItem } from "./Table.styles";
import type { TableHeaderProps } from "../Table.types";

import { Label } from "@/components/Label";

export const TableHeaderItem = ({ children }: TableHeaderProps) => (
  <StyledTableHeaderItem>
    <Label weight='bold'>{children}</Label>
  </StyledTableHeaderItem>
);

TableHeaderItem.displayName = "TableHeaderItem";
