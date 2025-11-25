import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { pxToRem } from 'utils';
import { BlockButton, Label } from '@/components';
import type { EmptyStateLayout, EmptyStateStyle, EmptyStateButton } from './emptyState.types';

const styledOptions = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && !prop.startsWith('$'),
};

const buttonMinWidthMap: Record<EmptyStateButton, number> = {
  primary: 58,
  both: 130,
} as const;

const baseVariantStyle = (theme: Theme): CSSObject => ({
  borderRadius: theme.scheme.semantic.radius[8],
});

const variantStylesMap = {
  empty: (theme: Theme): CSSObject => ({
    ...baseVariantStyle(theme),
  }),
  outlined: (theme: Theme): CSSObject => ({
    ...baseVariantStyle(theme),
    border: `1px dashed ${theme.color.semantic.stroke.alpha.assistive}`,
  }),
  alpha: (theme: Theme): CSSObject => ({
    ...baseVariantStyle(theme),
    backgroundColor: theme.color.semantic.fill.subtlest,
  }),
} satisfies Record<EmptyStateStyle, (theme: Theme) => CSSObject>;

export const EmptyStateRoot = styled(
  'div',
  styledOptions,
)<{
  $variant: EmptyStateStyle;
  $layout: EmptyStateLayout;
}>(({ theme, $variant, $layout }) => ({
  display: 'flex',
  flexDirection: $layout === 'vertical' ? 'column' : 'row',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  maxWidth: pxToRem(570),
  gap: theme.scheme.semantic.spacing[24],
  padding: `${theme.scheme.semantic.margin.lg} ${theme.scheme.semantic.margin.sm}`,
  ...variantStylesMap[$variant](theme),
}));

const contentLayoutStyles: Record<EmptyStateLayout, (theme: Theme) => CSSObject> = {
  vertical: theme => ({
    gap: theme.scheme.semantic.spacing[12],
    minWidth: pxToRem(360),
  }),
  horizontal: theme => ({
    alignItems: 'flex-start',
    maxWidth: pxToRem(560),
    gap: theme.scheme.semantic.spacing[10],
  }),
};

export const EmptyStateContentDiv = styled(
  'div',
  styledOptions,
)<{
  $layout: EmptyStateLayout;
}>(({ theme, $layout }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.scheme.semantic.spacing[0],
  ...contentLayoutStyles[$layout](theme),
}));

export const EmptyStateLabel = styled(Label)(({ theme }) => ({
  flex: 1,
  color: theme.color.semantic.object.neutral,
}));

export const EmptyStateBodyTextP = styled(
  'div',
  styledOptions,
)<{
  $layout: EmptyStateLayout;
}>(({ theme, $layout }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  color: theme.color.semantic.object.assistive,
  textAlign: $layout === 'vertical' ? 'center' : 'left',
  textOverflow: 'ellipsis',
  ...theme.textStyle['semantic-textStyle-body-xs-normal'],
}));

export const EmptyStateButtonContainerDiv = styled(
  'div',
  styledOptions,
)<{
  $hasSecondary: boolean;
}>(({ theme, $hasSecondary }) => {
  const buttonCombination: EmptyStateButton = $hasSecondary ? 'both' : 'primary';

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: pxToRem(buttonMinWidthMap[buttonCombination]),
    padding: theme.scheme.semantic.spacing[0],
    gap: theme.scheme.semantic.spacing[12],
  };
});

export const EmptyStateBlockButton = BlockButton.Basic;
