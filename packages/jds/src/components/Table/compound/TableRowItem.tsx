import { Children } from "react";

import type {
  TableRowItemProps,
  TableRowItemCodeProps,
  TableRowItemLabelProps,
  TableRowItemBaseProps,
  TableRowItemBadgeProps,
} from "../Table.types";
import {
  StyledTableRowItem,
  StyledTableItemContent,
  StyledTableItemTitle,
  StyledDescription,
  StyledCodeWrapper,
  StyledBadgeWrapper,
} from "./Table.styles";
import { ColorChip } from "../ColorChip/ColorChip";

import { ContentBadge } from "@/components/Badge";
import { Code } from "@/components/Code/Code";
import { Icon } from "@/components/Icon";
import { Label } from "@/components/Label";

const BadgeContent = ({ children }: Pick<TableRowItemBaseProps, "children">) => (
  <StyledBadgeWrapper>
    {Children.map(children, child => (
      <ContentBadge.Basic hierarchy='accent' badgeStyle='alpha'>
        {child}
      </ContentBadge.Basic>
    ))}
  </StyledBadgeWrapper>
);

const CodeContent = ({ children }: Pick<TableRowItemBaseProps, "children">) => (
  <StyledCodeWrapper>
    {Children.map(children, child => (
      <Code>{child}</Code>
    ))}
  </StyledCodeWrapper>
);

const LabelContent = ({ children, prefixIcon, color }: Omit<TableRowItemLabelProps, "variant">) => (
  <StyledTableItemTitle>
    {prefixIcon && <Icon name={prefixIcon} size='sm' aria-hidden='true' />}
    {color && <ColorChip color={color} />}
    <Label weight='bold'>{children}</Label>
  </StyledTableItemTitle>
);

const BadgeRowItem = ({ children }: TableRowItemBadgeProps) => (
  <BadgeContent>{children}</BadgeContent>
);

const CodeRowItem = ({ children, description }: TableRowItemCodeProps) => (
  <>
    <CodeContent>{children}</CodeContent>
    {description && <StyledDescription size='sm'>{description}</StyledDescription>}
  </>
);

const LabelRowItem = ({ children, description, prefixIcon, color }: TableRowItemLabelProps) => (
  <>
    <LabelContent prefixIcon={prefixIcon} color={color}>
      {children}
    </LabelContent>
    {description && <StyledDescription size='sm'>{description}</StyledDescription>}
  </>
);

export const TableRowItem = (props: TableRowItemProps) => {
  const { variant = "label", hasDivider = true, ...rest } = props;

  const renderContent = () => {
    if (props.variant === "badge") return <BadgeRowItem {...props} />;
    if (props.variant === "code") return <CodeRowItem {...props} />;

    return <LabelRowItem {...props} />;
  };

  return (
    <StyledTableRowItem variant={variant} hasDivider={hasDivider} {...rest}>
      <StyledTableItemContent>{renderContent()}</StyledTableItemContent>
    </StyledTableRowItem>
  );
};

TableRowItem.displayName = "TableRowItem";
