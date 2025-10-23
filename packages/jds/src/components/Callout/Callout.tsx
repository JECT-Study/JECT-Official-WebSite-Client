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
  title,
  blockButtonProps,
  children,
}: BasicCalloutProps) => {
  const buttonSize = calloutButtonSizeMap[size];

  return (
    <CalloutBasicDiv hierarchy={hierarchy} variant={variant} size={size}>
      {title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
      {blockButtonProps && (
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

type CalloutFeedbackButtonProps = Required<
  Pick<FeedbackCalloutProps, 'feedback' | 'size' | 'blockButtonProps'>
>;

const CalloutFeedbackButton = ({
  feedback,
  size,
  blockButtonProps,
}: CalloutFeedbackButtonProps) => {
  const buttonSize = calloutButtonSizeMap[size];

  return feedback === 'notifying' ? (
    <BlockButton.Basic
      hierarchy='primary'
      size={buttonSize}
      variant='solid'
      {...blockButtonProps}
    />
  ) : (
    <BlockButton.Feedback intent={feedback} size={buttonSize} {...blockButtonProps} />
  );
};

const CalloutFeedback = ({
  variant = 'hero',
  feedback,
  size = 'md',
  title,
  blockButtonProps,
  children,
}: FeedbackCalloutProps) => {
  return (
    <CalloutFeedbackDiv hierarchy={feedback} variant={variant} size={size}>
      {title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
      {blockButtonProps && (
        <CalloutFeedbackButton
          feedback={feedback}
          size={size}
          blockButtonProps={blockButtonProps}
        />
      )}
    </CalloutFeedbackDiv>
  );
};

CalloutFeedback.displayName = 'Callout.Feedback';

export const Callout = {
  Basic: CalloutBasic,
  Feedback: CalloutFeedback,
};
