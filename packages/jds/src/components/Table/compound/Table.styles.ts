import styled from "@emotion/styled";

import type { TableRowItemProps } from "../Table.types";

import { shouldForwardTypographyProp } from "@/utils/typography";

export const StyledTableRoot = styled.table(({ theme }) => ({
  width: "100%",

  tableLayout: "fixed",
  borderSpacing: 0,

  borderRadius: theme.scheme.semantic.radius[6],
  border: `1px solid ${theme.color.semantic.stroke.subtle}`,

  background: theme.color.semantic.surface.standard,
}));

export const StyledTableHeader = styled.thead(({ theme }) => ({
  background: theme.color.semantic.fill.subtlest,
}));

export const StyledTableHeaderItem = styled.th(({ theme }) => ({
  padding: theme.scheme.semantic.spacing[12],

  borderBottom: `1px solid ${theme.color.semantic.stroke.subtle}`,
  borderRight: `1px solid ${theme.color.semantic.stroke.subtle}`,

  "&:last-child": {
    borderRight: "none",
  },
}));

export const StyledTableRow = styled.tr(({ theme }) => ({
  background: theme.color.semantic.surface.standard,

  "&:last-of-type td": {
    borderBottom: "none",
  },
}));

export const StyledTableRowItem = styled.td<Partial<TableRowItemProps>>(
  ({ theme, hasDivider }) => ({
    padding: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.spacing[12]}`,
    verticalAlign: "middle",

    borderBottom: `1px solid ${theme.color.semantic.stroke.subtle}`,
    borderRight: hasDivider ? `1px solid ${theme.color.semantic.stroke.subtle}` : "none",

    "&:last-child": {
      borderRight: "none",
    },
  }),
);

export const StyledTableItemContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.scheme.semantic.spacing[6],
}));

export const StyledTableItemTitle = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.scheme.semantic.spacing[6],
}));

export const StyledDescription = styled("span", { shouldForwardProp: shouldForwardTypographyProp })(
  ({ theme }) => ({
    color: theme.color.semantic.object.alternative,
  }),
);

export const StyledCodeWrapper = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.scheme.semantic.spacing[4],
}));

export const StyledBadgeWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.scheme.semantic.spacing[6],
}));
