import {
  ToastCaptionP,
  ToastContentDiv,
  ToastDiv,
  ToastFeedbackIcon,
  ToastLabel,
  ToastLabelContainerDiv,
} from './toast.styles';
import { IconButton } from '@/components';
import { ToastBaseProps, ToastFeedbackProps } from './toast.types';
import { useState } from 'react';

const ToastBasic = ({ id, caption = undefined, onRemove, title }: ToastBaseProps) => {
  const [click, setClick] = useState(false);
  const onClose = () => setClick(true);

  return (
    <ToastDiv
      id={id}
      className={click ? 'delete' : ''}
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

const ToastFeedback: React.FC<ToastFeedbackProps> = ({
  id,
  feedback = 'positive',
  caption = undefined,
  onRemove,
  title,
}) => {
  const [click, setClick] = useState(false);
  const onClose = () => setClick(true);

  return (
    <ToastDiv
      id={id}
      className={click ? 'delete' : ''}
      toastStyle={feedback}
      onAnimationEnd={onRemove}
    >
      <ToastContentDiv>
        <ToastLabelContainerDiv>
          <ToastFeedbackIcon
            feedback={feedback}
            name={feedback === 'positive' ? 'check-line' : 'error-warning-line'}
          />
          <ToastLabel toastStyle={feedback} size='md' textAlign='left' weight='normal'>
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
