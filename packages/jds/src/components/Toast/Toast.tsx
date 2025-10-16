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

const ToastBasic = ({ caption = undefined, closeButtonFn, title }: ToastBaseProps) => {
  return (
    <ToastDiv toastStyle='basic'>
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
            onClick={closeButtonFn}
          />
        </ToastLabelContainerDiv>
        {caption && <ToastCaptionP>{caption}</ToastCaptionP>}
      </ToastContentDiv>
    </ToastDiv>
  );
};

ToastBasic.displayName = 'Toast.Basic';

const ToastFeedback: React.FC<ToastFeedbackProps> = ({
  feedback = 'positive',
  caption = undefined,
  closeButtonFn,
  title,
}) => {
  return (
    <ToastDiv toastStyle={feedback}>
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
            onClick={closeButtonFn}
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
