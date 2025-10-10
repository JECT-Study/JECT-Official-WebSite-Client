import styled from '@emotion/styled';
import { pxToRem, textStyle } from 'utils';
import { BasicHierarchy, CalloutSize, CalloutVariant, FeedbackHierarchy } from './Callout.types';
import { CALLOUT_BASIC_STYLE, CALLOUT_FEEDBACK_STYLE, CALLOUT_SIZE } from './Callout.variants';

interface BasicCalloutDivProps {
  hierarchy: BasicHierarchy;
  variant: CalloutVariant;
  size: CalloutSize;
}

interface FeedbackCalloutDivProps {
  hierarchy: FeedbackHierarchy;
  variant: CalloutVariant;
  size: CalloutSize;
}

export const BasicCalloutDiv = styled.div<BasicCalloutDivProps>(
  ({ theme, hierarchy, variant, size }) => {
    const style = CALLOUT_BASIC_STYLE(theme)[variant][hierarchy];
    const border = variant === 'hero' ? 'none' : `1px solid ${style.border}`;
    const borderLeft = variant === 'hero' ? `6px solid ${style.border}` : 'none';
    const borderRadius = variant === 'hero' ? 'none' : pxToRem(6);

    return {
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: `${pxToRem(CALLOUT_SIZE[size].paddingTopBottom)} ${pxToRem(CALLOUT_SIZE[size].paddingLeftRight)}`,
      gap: pxToRem(CALLOUT_SIZE[size].gap),
      border,
      borderLeft,
      borderRadius,
      backgroundColor: style.bg,
      color: style.color,
    };
  },
);

export const FeedbackCalloutDiv = styled.div<FeedbackCalloutDivProps>(
  ({ theme, hierarchy, variant, size }) => {
    const style = CALLOUT_FEEDBACK_STYLE(theme)[variant][hierarchy];

    return {
      width: pxToRem(300),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: `${pxToRem(CALLOUT_SIZE[size].paddingTopBottom)} ${pxToRem(CALLOUT_SIZE[size].paddingLeftRight)}`,
      gap: pxToRem(CALLOUT_SIZE[size].gap),
      borderLeft: `6px solid ${style.border}`,
      backgroundColor: style.bg,
      color: style.color,
    };
  },
);

interface CalloutPProps {
  size: CalloutSize;
}

export const CalloutTitleP = styled.p<CalloutPProps>(({ theme, size }) => {
  return {
    ...textStyle(theme, 'desktop', CALLOUT_SIZE[size].title),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', CALLOUT_SIZE[size].title) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', CALLOUT_SIZE[size].title) },
  };
});

export const CalloutContentP = styled.p<CalloutPProps>(({ theme, size }) => {
  return {
    ...textStyle(theme, 'desktop', CALLOUT_SIZE[size].content),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', CALLOUT_SIZE[size].content) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', CALLOUT_SIZE[size].content) },
  };
});
