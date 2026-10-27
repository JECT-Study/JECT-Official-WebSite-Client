import { ColorChip } from "./ColorChip/ColorChip";
import {
  TableRoot,
  TableHeader,
  TableHeaderItem,
  TableBody,
  TableRow,
  TableRowItem,
} from "./compound";

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  HeaderItem: TableHeaderItem,
  Body: TableBody,
  Row: TableRow,
  RowItem: TableRowItem,
  ColorChip,
};

export {
  TableRoot,
  TableHeader,
  TableHeaderItem,
  TableBody,
  TableRow,
  TableRowItem,
} from "./compound";
export { ColorChip as TableColorChip } from "./ColorChip/ColorChip";
export type {
  TableProps as TableRootProps,
  TableHeaderSectionProps as TableHeaderProps,
  TableHeaderItemProps,
  TableBodyProps,
  TableRowProps,
  TableRowItemProps,
  TableRowItemVariant,
  TableRowItemLabelProps,
  TableRowItemCodeProps,
  TableRowItemBadgeProps,
} from "./table.types";
export type { ColorChipProps as TableColorChipProps } from "./ColorChip/colorChip.types";
