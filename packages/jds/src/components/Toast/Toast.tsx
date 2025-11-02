import {
  ToastCaptionP,
  ToastContentDiv,
  ToastDiv,
  ToastFeedbackIcon,
  ToastLabel,
  ToastLabelContainerDiv,
} from './toast.styles';
import { IconButton } from '@/components';
import { ToastBasicProps, ToastFeedbackProps } from './toast.types';
import { useState } from 'react';

const ToastBasic = ({ id, caption, onRemove, title, isClosing }: ToastBasicProps) => {
  const [click, setClick] = useState(false);
  const onClose = () => setClick(true);

  return (
    <ToastDiv
      id={id}
      className={click || isClosing ? 'delete' : ''}
      toastStyle='basic'
      onAnimationEnd={onRemove}
    >
      <ToastContentDiv>
        <ToastLabelContainerDiv>
          <ToastLabel toastStyle='basic' size='md' textAlign='left' weight='normal'>
            {title}
          </ToastLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
            onClick={onClose}
          />
        </ToastLabelContainerDiv>
        {caption && <ToastCaptionP>{caption}</ToastCaptionP>}
      </ToastContentDiv>
    </ToastDiv>
  );
};

ToastBasic.displayName = 'Toast.Basic';

const ToastFeedback = ({
  id,
  variant = 'positive',
  caption,
  onRemove,
  title,
  isClosing,
}: ToastFeedbackProps) => {
  const [click, setClick] = useState(false);
  const onClose = () => setClick(true);

  return (
    <ToastDiv
      id={id}
      className={click || isClosing ? 'delete' : ''}
      toastStyle={variant}
      onAnimationEnd={onRemove}
    >
      <ToastContentDiv>
        <ToastLabelContainerDiv>
          <ToastFeedbackIcon
            variant={variant}
            name={variant === 'positive' ? 'check-line' : 'error-warning-line'}
          />
          <ToastLabel toastStyle={variant} size='md' textAlign='left' weight='normal'>
            {title}
          </ToastLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
            onClick={onClose}
          />
        </ToastLabelContainerDiv>
        {caption && <ToastCaptionP>{caption}</ToastCaptionP>}
      </ToastContentDiv>
    </ToastDiv>
  );
};

ToastFeedback.displayName = 'Toast.Feedback';

export const Toast = {
  Basic: ToastBasic,
  Feedback: ToastFeedback,
};
