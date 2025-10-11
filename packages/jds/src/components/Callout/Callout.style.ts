import styled from '@emotion/styled';
import { pxToRem, textStyle } from 'utils';
import { CalloutBasicDivProps, CalloutFeedbackDivProps, CalloutPProps } from './Callout.types';
import {
  calloutBasicStylesMap,
  calloutFeedbackStylesMap,
  calloutSizeMap,
} from './Callout.variants';

export const CalloutBasicDiv = styled.div<CalloutBasicDivProps>(
  ({ theme, hierarchy, variant, size }) => {
    const style = calloutBasicStylesMap(theme)[variant][hierarchy];
    const border = variant === 'hero' ? 'none' : `1px solid ${style.border}`;
    const borderLeft = variant === 'hero' ? `6px solid ${style.border}` : 'none';
    const borderRadius = variant === 'hero' ? 'none' : pxToRem(6);

    return {
      width: pxToRem(300),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
      gap: pxToRem(calloutSizeMap[size].gap),
      border,
      borderLeft,
      borderRadius,
      backgroundColor: style.bg,
      color: style.color,
    };
  },
);

export const CalloutFeedbackDiv = styled.div<CalloutFeedbackDivProps>(
  ({ theme, hierarchy, variant, size }) => {
    const style = calloutFeedbackStylesMap(theme)[variant][hierarchy];

    return {
      width: pxToRem(300),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
      gap: pxToRem(calloutSizeMap[size].gap),
      borderLeft: `6px solid ${style.border}`,
      backgroundColor: style.bg,
      color: style.color,
    };
  },
);

export const CalloutTitleP = styled.p<CalloutPProps>(({ theme, size }) => {
  return {
    ...textStyle(theme, 'desktop', calloutSizeMap[size].title),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', calloutSizeMap[size].title) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', calloutSizeMap[size].title) },
  };
});

export const CalloutContentP = styled.p<CalloutPProps>(({ theme, size }) => {
  return {
    ...textStyle(theme, 'desktop', calloutSizeMap[size].content),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', calloutSizeMap[size].content) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', calloutSizeMap[size].content) },
  };
});
