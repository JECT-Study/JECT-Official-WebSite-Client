import { useEffect, useState } from "react";

import {
  ToastCaptionP,
  ToastContentDiv,
  ToastDiv,
  ToastFeedbackIcon,
  ToastLabel,
  ToastLabelContainerDiv,
} from "./toast.styles";
import type { ToastBasicProps, ToastFeedbackProps } from "./toast.types";

import { IconButton } from "@/components";

const ToastBasic = ({ id, caption, onRemove, title, isClosing }: ToastBasicProps) => {
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
    <ToastDiv id={id} className={phase} toastStyle='basic' onAnimationEnd={onAnimationEnd}>
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

ToastBasic.displayName = "Toast.Basic";

const ToastFeedback = ({
  id,
  variant = "positive",
  caption,
  onRemove,
  title,
  isClosing,
}: ToastFeedbackProps) => {
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
    <ToastDiv id={id} className={phase} toastStyle={variant} onAnimationEnd={onAnimationEnd}>
      <ToastContentDiv>
        <ToastLabelContainerDiv>
          <ToastFeedbackIcon
            variant={variant}
            name={variant === "positive" ? "check-line" : "error-warning-line"}
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

ToastFeedback.displayName = "Toast.Feedback";

export const Toast = {
  Basic: ToastBasic,
  Feedback: ToastFeedback,
};
