import type { HTMLAttributes, ReactNode, ThHTMLAttributes } from "react";

import type { IconName } from "../Icon";

export type TableRowItemVariant = "label" | "code" | "badge";

export interface TableRowItemBaseProps extends HTMLAttributes<HTMLTableCellElement> {
  hasDivider?: boolean;
  children: ReactNode;
}

export interface TableHeaderItemProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  width?: string | number;
  hasDivider?: boolean;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableHeaderSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  rowProps?: HTMLAttributes<HTMLTableRowElement>;
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

type KeysOfUnion<T> = T extends unknown ? keyof T : never;

type TableRowItemCustomKey = Exclude<
  KeysOfUnion<TableRowItemProps>,
  keyof HTMLAttributes<HTMLTableCellElement>
>;

export type TableRowItemOwnKey = TableRowItemCustomKey | "children" | "color";
