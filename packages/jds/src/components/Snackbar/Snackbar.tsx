import {
  ButtonContainerDiv,
  SnackbarCaptionP,
  SnackbarContentDiv,
  SnackbarDiv,
  SnackbarFeedbackIcon,
  SnackbarLabel,
  SnackbarLabelContainerDiv,
} from './snackbar.styles';
import { BlockButton, IconButton } from '@/components';
import { SnackbarBaseProps, SnackbarButtonsProps, SnackbarFeedbackProps } from './snackbar.types';

const SnackbarButtons = ({ prefixButtonProps, suffixButtonProps }: SnackbarButtonsProps) => {
  if (!prefixButtonProps && !suffixButtonProps) return;

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

const SnackbarBasic = ({
  caption = undefined,
  prefixButtonProps = undefined,
  suffixButtonProps = undefined,
  title,
  closeButtonFn,
  isExiting = false,
}: SnackbarBaseProps) => {
  return (
    <SnackbarDiv snackbarStyle='basic' isExiting={isExiting}>
      <SnackbarContentDiv>
        <SnackbarLabelContainerDiv>
          <SnackbarLabel snackbarStyle='basic' size='md' textAlign='left' weight='normal'>
            {title}
          </SnackbarLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
            onClick={closeButtonFn}
          />
        </SnackbarLabelContainerDiv>
        {caption && <SnackbarCaptionP>{caption}</SnackbarCaptionP>}
      </SnackbarContentDiv>
      <SnackbarButtons
        prefixButtonProps={prefixButtonProps}
        suffixButtonProps={suffixButtonProps}
      />
    </SnackbarDiv>
  );
};

SnackbarBasic.displayName = 'Snackbar.Basic';

const SnackbarFeedback = ({
  feedback = 'positive',
  caption = undefined,
  prefixButtonProps = undefined,
  suffixButtonProps = undefined,
  title,
  closeButtonFn,
  isExiting = false,
}: SnackbarFeedbackProps) => {
  return (
    <SnackbarDiv snackbarStyle={feedback} isExiting={isExiting}>
      <SnackbarContentDiv>
        <SnackbarLabelContainerDiv>
          <SnackbarFeedbackIcon
            feedback={feedback}
            name={feedback === 'positive' ? 'check-line' : 'error-warning-line'}
          />
          <SnackbarLabel snackbarStyle={feedback} size='md' textAlign='left' weight='normal'>
            {title}
          </SnackbarLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
            onClick={closeButtonFn}
          />
        </SnackbarLabelContainerDiv>
        {caption && <SnackbarCaptionP>{caption}</SnackbarCaptionP>}
      </SnackbarContentDiv>
      <SnackbarButtons
        prefixButtonProps={prefixButtonProps}
        suffixButtonProps={suffixButtonProps}
      />
    </SnackbarDiv>
  );
};

SnackbarFeedback.displayName = 'Snackbar.Feedback';

export const Snackbar = {
  Basic: SnackbarBasic,
  Feedback: SnackbarFeedback,
};
