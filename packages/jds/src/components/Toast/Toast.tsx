import {
  ButtonContainerDiv,
  ToastCaptionP,
  ToastContentDiv,
  ToastDiv,
  ToastFeedbackIcon,
  ToastLabel,
  ToastLabelContainerDiv,
} from './toast.styles';
import { BlockButton, IconButton } from '@/components';
import { ToastBaseProps, ToastButtonsProps, ToastFeedbackProps } from './toast.types';

const ToastButtons = ({ variant, prefixButtonProps, suffixButtonProps }: ToastButtonsProps) => {
  if ((!prefixButtonProps && !suffixButtonProps) || variant !== 'snackbar') return;

  return (
    <ButtonContainerDiv>
      {prefixButtonProps && (
        <BlockButton.Basic hierarchy='tertiary' size='xs' variant='solid' {...prefixButtonProps}>
          {prefixButtonProps.children}
        </BlockButton.Basic>
      )}
      {suffixButtonProps && (
        <BlockButton.Basic hierarchy='primary' size='xs' variant='solid' {...suffixButtonProps}>
          {suffixButtonProps.children}
        </BlockButton.Basic>
      )}
    </ButtonContainerDiv>
  );
};

const ToastBasic = ({
  variant = 'toast',
  caption = undefined,
  prefixButtonProps = undefined,
  suffixButtonProps = undefined,
  children,
}: ToastBaseProps) => {
  return (
    <ToastDiv toastStyle='basic'>
      <ToastContentDiv>
        <ToastLabelContainerDiv>
          <ToastLabel toastStyle='basic' size='md' textAlign='left' weight='normal'>
            {children}
          </ToastLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
          />
        </ToastLabelContainerDiv>
        <ToastCaptionP>{caption}</ToastCaptionP>
      </ToastContentDiv>
      <ToastButtons
        variant={variant}
        prefixButtonProps={prefixButtonProps}
        suffixButtonProps={suffixButtonProps}
      />
    </ToastDiv>
  );
};

ToastBasic.displayName = 'Toast.Basic';

const ToastFeedback: React.FC<ToastFeedbackProps> = ({
  variant = 'toast',
  feedback = 'positive',
  caption = undefined,
  prefixButtonProps = undefined,
  suffixButtonProps = undefined,
  children,
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
            {children}
          </ToastLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
          />
        </ToastLabelContainerDiv>
        <ToastCaptionP>{caption}</ToastCaptionP>
      </ToastContentDiv>
      <ToastButtons
        variant={variant}
        prefixButtonProps={prefixButtonProps}
        suffixButtonProps={suffixButtonProps}
      />
    </ToastDiv>
  );
};

ToastFeedback.displayName = 'Toast.Feedback';

export const Toast = {
  Basic: ToastBasic,
  Feedback: ToastFeedback,
};
