import { BlockButton } from '../Button/BlockButton';
import {
  CalloutBasicDiv,
  CalloutContentP,
  CalloutTitleP,
  CalloutFeedbackDiv,
} from './Callout.style';
import { BasicCalloutProps, FeedbackCalloutProps } from './Callout.types';
import { calloutButtonSizeMap } from './Callout.variants';

const CalloutBasic = ({
  variant = 'hero',
  hierarchy,
  size = 'md',
  titleVisible = false,
  title,
  extraButtonVisible = false,
  blockButtonProps,
  children,
}: BasicCalloutProps) => {
  const buttonSize = calloutButtonSizeMap[size];

  return (
    <CalloutBasicDiv hierarchy={hierarchy} variant={variant} size={size}>
      {titleVisible && title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
      {extraButtonVisible && blockButtonProps && (
        <BlockButton.Basic
          hierarchy={hierarchy}
          size={buttonSize}
          variant='solid'
          {...blockButtonProps}
        />
      )}
    </CalloutBasicDiv>
  );
};

CalloutBasic.displayName = 'Callout.Basic';

const CalloutFeedback = ({
  variant = 'hero',
  feedback,
  size = 'md',
  titleVisible = false,
  title,
  extraButtonVisible = false,
  blockButtonProps,
  children,
}: FeedbackCalloutProps) => {
  const buttonSize = calloutButtonSizeMap[size];

  return (
    <CalloutFeedbackDiv hierarchy={feedback} variant={variant} size={size}>
      {titleVisible && title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
      {extraButtonVisible &&
        blockButtonProps &&
        (feedback === 'notifying' ? (
          <BlockButton.Basic
            hierarchy='primary'
            size={buttonSize}
            variant='solid'
            {...blockButtonProps}
          />
        ) : (
          <BlockButton.Feedback intent={feedback} size={buttonSize} {...blockButtonProps} />
        ))}
    </CalloutFeedbackDiv>
  );
};

CalloutFeedback.displayName = 'Callout.Feedback';

export const Callout = {
  Basic: CalloutBasic,
  Feedback: CalloutFeedback,
};
