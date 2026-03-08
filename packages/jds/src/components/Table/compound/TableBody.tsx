import type { TableRowProps } from "../Table.types";

export const TableBody = ({ children }: TableRowProps) => {
  return <tbody>{children}</tbody>;
};

TableBody.displayName = "TableBody";
