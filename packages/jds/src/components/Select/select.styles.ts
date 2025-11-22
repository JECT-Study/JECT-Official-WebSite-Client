import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { SelectSize } from 'components';
import { ContentBadge, Label } from 'components';
import { InteractionLayer } from 'utils';

export const StyledSelectContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 0,
  maxWidth: '20rem',
  maxHeight: '20rem',
  flexShrink: 0,
  borderRadius: theme.scheme.semantic.radius[8],
  border: `1px solid ${theme.color.semantic.stroke.subtle}`,
  opacity: 1,
  background: theme.color.semantic.surface.shallow,
  boxShadow: `0 0 ${theme.scheme.semantic.radius[2]} 0 ${theme.colorPrimitive.primitive.shade['4']}, 0 ${theme.scheme.semantic.spacing[3]} ${theme.scheme.semantic.radius[4]} 0 ${theme.colorPrimitive.primitive.shade['8']}, 0 ${theme.scheme.semantic.spacing[4]} ${theme.scheme.semantic.radius[8]} 0 ${theme.colorPrimitive.primitive.shade['12']}`,
}));

export const StyledSelectLabelWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  color: theme.color.semantic.object.assistive,
  padding: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.spacing[12]} ${theme.scheme.semantic.spacing[6]} ${theme.scheme.semantic.spacing[12]}`,
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[8],
  alignSelf: 'stretch',
}));

export const StyledSelectItemsWrapper = styled('div')({
  display: 'flex',
  padding: 0,
  flexDirection: 'column',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  gap: 0,
  overflow: 'hidden',
});

const getItemPaddingBySize = (theme: Theme, size: SelectSize): string => {
  const paddingMap = {
    md: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.spacing[12]}`,
    sm: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.spacing[12]}`,
  };

  return paddingMap[size];
};

export const StyledSelectItem = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $size: SelectSize;
  $isDisabled: boolean;
  $selected: boolean;
}>(({ theme, $size, $isDisabled, $selected }) => {
  const BORDER_RADIUS = 0;

  const interactionVariant = $selected ? 'accent' : 'normal';

  const restInteractionStyle = InteractionLayer({
    theme,
    state: 'rest',
    variant: interactionVariant,
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    borderRadius: BORDER_RADIUS,
  });

  const hoverInteractionStyle = InteractionLayer({
    theme,
    state: 'hover',
    variant: interactionVariant,
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    borderRadius: BORDER_RADIUS,
  });

  const activeInteractionStyle = InteractionLayer({
    theme,
    state: 'active',
    variant: interactionVariant,
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    borderRadius: BORDER_RADIUS,
  });

  const focusInteractionStyle = InteractionLayer({
    theme,
    state: 'hover',
    variant: interactionVariant,
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    borderRadius: BORDER_RADIUS,
  });

  const baseStyles: CSSObject = {
    ...restInteractionStyle,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 0,
    padding: getItemPaddingBySize(theme, $size),
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.color.semantic.stroke.subtler}`,
    cursor: $isDisabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    userSelect: 'none',

    '&:last-child': {
      borderBottom: 'none',
    },

    '::after': {
      ...restInteractionStyle['::after'],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
  };

  if ($isDisabled) {
    return baseStyles;
  }

  return {
    ...baseStyles,
    '&:hover': {
      ...hoverInteractionStyle,
      '::after': {
        ...hoverInteractionStyle['::after'],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },
    '&:active': {
      ...activeInteractionStyle,
      '::after': {
        ...activeInteractionStyle['::after'],
        transition: 'none',
      },
    },
    '&:focus-visible': {
      ...focusInteractionStyle,
      outline: 'none',
      '::after': {
        ...focusInteractionStyle['::after'],
      },
    },
  };
});

export const StyledSelectItemContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  padding: 0,
  gap: theme.scheme.semantic.spacing[2],
  flex: 1,
  position: 'relative',
  zIndex: 1,
}));

export const StyledSelectItemTextRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[16],
  position: 'relative',
  zIndex: 1,
}));

export const StyledSelectItemText = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{
  $isDisabled: boolean;
  $selected: boolean;
}>(({ theme, $isDisabled, $selected }) => {
  const getColor = () => {
    if ($isDisabled) return theme.color.semantic.object.subtle;
    if ($selected) return theme.color.semantic.accent.normal;
    return theme.color.semantic.object.bold;
  };

  return {
    color: getColor(),
  };
});

export const StyledSelectItemCaption = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{ $isDisabled: boolean }>(({ theme, $isDisabled }) => ({
  color: $isDisabled ? theme.color.semantic.object.subtle : theme.color.semantic.object.assistive,
}));

export const StyledSelectItemBadge = styled(ContentBadge.Basic)({
  position: 'relative',
  zIndex: 1,
});

//ToDo: CheckBox, Radio를 감싸는 임시 div이므로 직접 스타일링 수정 필요
export const StyledSelectItemInputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
});
