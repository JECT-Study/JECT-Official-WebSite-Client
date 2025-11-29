import { useEffect, useState } from "react";

import {
  ButtonContainerDiv,
  SnackbarCaptionP,
  SnackbarContentDiv,
  SnackbarDiv,
  SnackbarFeedbackIcon,
  SnackbarLabel,
  SnackbarLabelContainerDiv,
} from "./snackbar.styles";
import type {
  SnackbarBasicProps,
  SnackbarButtonsProps,
  SnackbarFeedbackProps,
} from "./snackbar.types";

import { BlockButton, IconButton } from "@/components";

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
  const [phase, setPhase] = useState<"enter" | "static" | "exit">("enter");

  const onAnimationEnd = () => {
    if (phase === "enter") {
      setPhase("static");
      return;
    }

    if (phase === "exit") {
      onRemove?.();
    }
  };

  const onClose = () => setPhase("exit");

  useEffect(() => {
    if (phase === "static") {
      const timer = setTimeout(() => setPhase("exit"), 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (isClosing) setPhase("exit");
  }, [isClosing]);

  return (
    <SnackbarDiv id={id} className={phase} snackbarStyle='basic' onAnimationEnd={onAnimationEnd}>
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

SnackbarBasic.displayName = "Snackbar.Basic";

const SnackbarFeedback = ({
  id,
  variant = "positive",
  caption = undefined,
  prefixButtonProps = undefined,
  suffixButtonProps = undefined,
  title,
  onRemove,
  isClosing,
}: SnackbarFeedbackProps) => {
  const [phase, setPhase] = useState<"enter" | "static" | "exit">("enter");

  const onAnimationEnd = () => {
    if (phase === "enter") {
      setPhase("static");
      return;
    }

    if (phase === "exit") {
      onRemove?.();
    }
  };

  const onClose = () => setPhase("exit");

  useEffect(() => {
    if (phase === "static") {
      const timer = setTimeout(() => setPhase("exit"), 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (isClosing) setPhase("exit");
  }, [isClosing]);

  return (
    <SnackbarDiv id={id} className={phase} snackbarStyle={variant} onAnimationEnd={onAnimationEnd}>
      <SnackbarContentDiv>
        <SnackbarLabelContainerDiv>
          <SnackbarFeedbackIcon
            variant={variant}
            name={variant === "positive" ? "check-line" : "error-warning-line"}
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

SnackbarFeedback.displayName = "Snackbar.Feedback";

export const Snackbar = {
  Basic: SnackbarBasic,
  Feedback: SnackbarFeedback,
};
