import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { SelectSize } from 'components';
import { ContentBadge, Label } from 'components';
import { InteractionLayer, pxToRem } from 'utils';

export const StyledSelectContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 0,
  maxWidth: pxToRem(320),
  maxHeight: pxToRem(320),
  flexShrink: 0,
  borderRadius: pxToRem(theme.scheme.desktop.radius[8]),
  border: `1px solid ${theme.color.stroke.subtle}`,
  opacity: 1,
  background: theme.color.surface.shallow,
  boxShadow: `0 0 ${pxToRem(theme.scheme.desktop.radius[2])} 0 ${theme.colorPrimitive.primitive.shade['4']}, 0 ${pxToRem(theme.scheme.desktop.spacing[3])} ${pxToRem(theme.scheme.desktop.radius[4])} 0 ${theme.colorPrimitive.primitive.shade['8']}, 0 ${pxToRem(theme.scheme.desktop.spacing[4])} ${pxToRem(theme.scheme.desktop.radius[8])} 0 ${theme.colorPrimitive.primitive.shade['12']}`,

  [theme.breakPoint.tablet]: {
    borderRadius: pxToRem(theme.scheme.tablet.radius[8]),
    boxShadow: `0 0 ${pxToRem(theme.scheme.desktop.radius[2])} 0 ${theme.colorPrimitive.primitive.shade['4']}, 0 ${pxToRem(theme.scheme.desktop.spacing[3])} ${pxToRem(theme.scheme.desktop.radius[4])} 0 ${theme.colorPrimitive.primitive.shade['8']}, 0 ${pxToRem(theme.scheme.desktop.spacing[4])} ${pxToRem(theme.scheme.desktop.radius[8])} 0 ${theme.colorPrimitive.primitive.shade['12']}`,
  },

  [theme.breakPoint.mobile]: {
    borderRadius: pxToRem(theme.scheme.mobile.radius[8]),
    boxShadow: `0 0 ${pxToRem(theme.scheme.desktop.radius[2])} 0 ${theme.colorPrimitive.primitive.shade['4']}, 0 ${pxToRem(theme.scheme.desktop.spacing[3])} ${pxToRem(theme.scheme.desktop.radius[4])} 0 ${theme.colorPrimitive.primitive.shade['8']}, 0 ${pxToRem(theme.scheme.desktop.spacing[4])} ${pxToRem(theme.scheme.desktop.radius[8])} 0 ${theme.colorPrimitive.primitive.shade['12']}`,
  },
}));

export const StyledSelectLabelWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  color: theme.color.object.assistive,
  padding: `${pxToRem(theme.scheme.desktop.spacing[10])} ${pxToRem(theme.scheme.desktop.spacing[12])} ${pxToRem(theme.scheme.desktop.spacing[6])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
  alignItems: 'center',
  gap: pxToRem(theme.scheme.desktop.spacing[8]),
  alignSelf: 'stretch',

  [theme.breakPoint.tablet]: {
    padding: `${pxToRem(theme.scheme.tablet.spacing[10])} ${pxToRem(theme.scheme.tablet.spacing[12])} ${pxToRem(theme.scheme.tablet.spacing[6])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
    gap: pxToRem(theme.scheme.tablet.spacing[8]),
  },

  [theme.breakPoint.mobile]: {
    padding: `${pxToRem(theme.scheme.mobile.spacing[10])} ${pxToRem(theme.scheme.mobile.spacing[12])} ${pxToRem(theme.scheme.mobile.spacing[6])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
    gap: pxToRem(theme.scheme.mobile.spacing[8]),
  },
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

const getItemPaddingBySize = (
  theme: Theme,
  size: SelectSize,
  device: 'desktop' | 'tablet' | 'mobile',
): string => {
  const paddingMap = {
    md: {
      desktop: `${pxToRem(theme.scheme.desktop.spacing[10])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
      tablet: `${pxToRem(theme.scheme.tablet.spacing[10])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
      mobile: `${pxToRem(theme.scheme.mobile.spacing[10])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
    },
    sm: {
      desktop: `${pxToRem(theme.scheme.desktop.spacing[10])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
      tablet: `${pxToRem(theme.scheme.tablet.spacing[10])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
      mobile: `${pxToRem(theme.scheme.mobile.spacing[10])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
    },
  };

  return paddingMap[size][device];
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
    padding: getItemPaddingBySize(theme, $size, 'desktop'),
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.color.stroke.subtler}`,
    cursor: $isDisabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    userSelect: 'none',

    '&:last-child': {
      borderBottom: 'none',
    },

    '::after': {
      ...restInteractionStyle['::after'],
      transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
    },

    [theme.breakPoint.tablet]: {
      padding: getItemPaddingBySize(theme, $size, 'tablet'),
    },

    [theme.breakPoint.mobile]: {
      padding: getItemPaddingBySize(theme, $size, 'mobile'),
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
        transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
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
  gap: pxToRem(theme.scheme.desktop.spacing[2]),
  flex: 1,
  position: 'relative',
  zIndex: 1,

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[2]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[2]),
  },
}));

export const StyledSelectItemTextRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: pxToRem(theme.scheme.desktop.spacing[16]),
  position: 'relative',
  zIndex: 1,

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[16]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[16]),
  },
}));

export const StyledSelectItemText = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{
  $isDisabled: boolean;
  $selected: boolean;
}>(({ theme, $isDisabled, $selected }) => {
  const getColor = () => {
    if ($isDisabled) return theme.color.object.subtle;
    if ($selected) return theme.color.accent.normal;
    return theme.color.object.bold;
  };

  return {
    color: getColor(),
  };
});

export const StyledSelectItemCaption = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{ $isDisabled: boolean }>(({ theme, $isDisabled }) => ({
  color: $isDisabled ? theme.color.object.subtle : theme.color.object.assistive,
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
