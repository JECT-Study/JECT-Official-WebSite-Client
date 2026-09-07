import { clsx } from "clsx";
import { Children, forwardRef, type HTMLAttributes } from "react";

import type {
  TableRowItemProps,
  TableRowItemCodeProps,
  TableRowItemLabelProps,
  TableRowItemBaseProps,
  TableRowItemBadgeProps,
  TableRowItemOwnKey,
} from "../table.types";
import {
  badgeWrapper,
  codeWrapper,
  descriptionStyle,
  tableItemContent,
  tableItemLabel,
  tableItemTitle,
  tableRowItem,
} from "./table.css";
import { ColorChip } from "../ColorChip/ColorChip";

import { ContentBadge } from "@/components/Badge";
import { Code } from "@/components/Code/Code";
import { Icon } from "@/components/Icon";
import { getLabelClassName } from "@/utils/typography";

const BadgeContent = ({ children }: Pick<TableRowItemBaseProps, "children">) => (
  <div className={badgeWrapper}>
    {Children.map(children, child => (
      <ContentBadge size='sm' hierarchy='primary' badgeStyle='alpha'>
        {child}
      </ContentBadge>
    ))}
  </div>
);

const CodeContent = ({ children }: Pick<TableRowItemBaseProps, "children">) => (
  <div className={codeWrapper}>
    {Children.map(children, child => (
      <Code>{child}</Code>
    ))}
  </div>
);

const LabelContent = ({ children, prefixIcon, color }: Omit<TableRowItemLabelProps, "variant">) => (
  <div className={tableItemTitle}>
    {prefixIcon && <Icon name={prefixIcon} size='sm' aria-hidden='true' />}
    {color && <ColorChip color={color} aria-hidden='true' />}
    <span className={clsx(getLabelClassName(), tableItemLabel)}>{children}</span>
  </div>
);

const BadgeRowItem = ({ children }: TableRowItemBadgeProps) => (
  <BadgeContent>{children}</BadgeContent>
);

const CodeRowItem = ({ children, description }: TableRowItemCodeProps) => (
  <>
    <CodeContent>{children}</CodeContent>
    {description && (
      <span className={clsx(getLabelClassName({ size: "sm" }), descriptionStyle)}>
        {description}
      </span>
    )}
  </>
);

const LabelRowItem = ({ children, description, prefixIcon, color }: TableRowItemLabelProps) => (
  <>
    <LabelContent prefixIcon={prefixIcon} color={color}>
      {children}
    </LabelContent>
    {description && (
      <span className={clsx(getLabelClassName({ size: "sm" }), descriptionStyle)}>
        {description}
      </span>
    )}
  </>
);

export const TableRowItem = forwardRef<HTMLTableCellElement, TableRowItemProps>((props, ref) => {
  const { hasDivider = true } = props;
  const { className, ...tableCellProps } = getTableCellProps(props);

  const renderContent = () => {
    if (props.variant === "badge") return <BadgeRowItem {...props} />;
    if (props.variant === "code") return <CodeRowItem {...props} />;

    return <LabelRowItem {...props} />;
  };

  return (
    <td ref={ref} className={clsx(tableRowItem({ hasDivider }), className)} {...tableCellProps}>
      <div className={tableItemContent({ variant: props.variant })}>{renderContent()}</div>
    </td>
  );
});

TableRowItem.displayName = "Table.RowItem";

const tableRowItemOnlyProps: Record<TableRowItemOwnKey, true> = {
  variant: true,
  hasDivider: true,
  children: true,
  description: true,
  prefixIcon: true,
  color: true,
};

const getTableCellProps = (props: TableRowItemProps): HTMLAttributes<HTMLTableCellElement> => {
  const tableCellEntries = Object.entries(props).filter(([key]) => !(key in tableRowItemOnlyProps));

  return Object.fromEntries(tableCellEntries) as HTMLAttributes<HTMLTableCellElement>;
};
