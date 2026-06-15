import type { HTMLAttributes, ReactNode } from "react";

import type { IconName } from "../Icon";

export type TableRowItemVariant = "label" | "code" | "badge";
export type TableRowItemOnlyProp =
  | "variant"
  | "hasDivider"
  | "children"
  | "description"
  | "prefixIcon"
  | "color";

export interface TableRowItemBaseProps extends HTMLAttributes<HTMLTableCellElement> {
  hasDivider?: boolean;
  children: ReactNode;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  width?: string | number;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export interface TableRowItemLabelProps extends TableRowItemBaseProps {
  variant: "label";
  description?: string;
  prefixIcon?: IconName;
  color?: string;
}

export interface TableRowItemCodeProps extends TableRowItemBaseProps {
  variant: "code";
  description?: string;
}

export interface TableRowItemBadgeProps extends TableRowItemBaseProps {
  variant: "badge";
}

export type TableRowItemProps =
  | TableRowItemLabelProps
  | TableRowItemCodeProps
  | TableRowItemBadgeProps;
