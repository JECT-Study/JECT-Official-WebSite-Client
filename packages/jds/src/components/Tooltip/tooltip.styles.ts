import styled from '@emotion/styled';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { pxToRem, shadow } from 'utils';

export const StyledTooltipContent = styled(TooltipPrimitive.Content)(({ theme }) => ({
  backgroundColor: theme.color.semantic.fill.boldest,
  color: theme.color.semantic.object.inverse.boldest,
  padding: `${theme.scheme.semantic.spacing[6]} ${theme.scheme.semantic.spacing[10]}`,
  borderRadius: theme.scheme.semantic.radius[8],
  //NOTE : 모바일 디바이스 절대 최소치 기준(토큰 breakpoint 명으로 개선되어도 됨)
  maxWidth: pxToRem(320),
  overflowWrap: 'break-word',
  zIndex: 9999,
  ...shadow(theme, 'overlay'),
  ...theme.textStyle['semantic-textStyle-body-sm-normal'],

  '&[data-state="delayed-open"]': {
    animation: `tooltipFadeIn ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.fluent}`,
  },

  '&[data-state="instant-open"]': {
    animation: `tooltipFadeIn ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.fluent}`,
  },

  '&[data-state="closed"]': {
    animation: `tooltipFadeOut ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.fluent}`,
  },

  '@keyframes tooltipFadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },

  '@keyframes tooltipFadeOut': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
}));
