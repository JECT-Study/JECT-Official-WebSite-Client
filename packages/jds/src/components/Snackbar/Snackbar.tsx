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
import { SnackbarBasicProps, SnackbarButtonsProps, SnackbarFeedbackProps } from './snackbar.types';
import { useState } from 'react';

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
  id,
  caption,
  prefixButtonProps,
  suffixButtonProps,
  title,
  onRemove,
  isClosing,
}: SnackbarBasicProps) => {
  const [click, setClick] = useState(false);
  const onClose = () => setClick(true);

  return (
    <SnackbarDiv
      id={id}
      className={click || isClosing ? 'delete' : ''}
      snackbarStyle='basic'
      onAnimationEnd={onRemove}
    >
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
            onClick={onClose}
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
  id,
  variant = 'positive',
  caption = undefined,
  prefixButtonProps = undefined,
  suffixButtonProps = undefined,
  title,
  onRemove,
  isClosing,
}: SnackbarFeedbackProps) => {
  const [click, setClick] = useState(false);
  const onClose = () => setClick(true);

  return (
    <SnackbarDiv
      id={id}
      className={click || isClosing ? 'delete' : ''}
      snackbarStyle={variant}
      onAnimationEnd={onRemove}
    >
      <SnackbarContentDiv>
        <SnackbarLabelContainerDiv>
          <SnackbarFeedbackIcon
            variant={variant}
            name={variant === 'positive' ? 'check-line' : 'error-warning-line'}
          />
          <SnackbarLabel snackbarStyle={variant} size='md' textAlign='left' weight='normal'>
            {title}
          </SnackbarLabel>
          <IconButton.Basic
            icon='close-line'
            hierarchy='secondary'
            size='md'
            aria-label='toast close button'
            onClick={onClose}
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
