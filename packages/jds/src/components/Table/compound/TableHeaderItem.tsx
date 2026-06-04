import { StyledTableHeaderItem } from "./Table.styles";
import type { TableHeaderProps } from "../Table.types";

import { getLabelClassName } from "@/utils/typography";

export const TableHeaderItem = ({ children }: TableHeaderProps) => (
  <StyledTableHeaderItem>
    <span className={getLabelClassName({ weight: "bold" })}>{children}</span>
  </StyledTableHeaderItem>
);

TableHeaderItem.displayName = "TableHeaderItem";
