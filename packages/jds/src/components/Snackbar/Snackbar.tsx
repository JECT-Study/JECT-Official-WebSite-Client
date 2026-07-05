import { clsx } from "clsx";
import { useEffect, useState } from "react";

import { SNACKBAR_ANIMATION_TIMER, SNACKBAR_DEFAULT_DURATION } from "./snackbar.constants";
import * as styles from "./snackbar.css";
import type { SnackbarFeedbackVariant, SnackbarProps } from "./snackbar.types";
import { IconButton } from "../Button/IconButton";
import { LabelButton } from "../Button/LabelButton";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";

import { getBodyClassName, getLabelClassName } from "@/utils/typography";

type SnackbarPhase = "enter" | "static" | "exit";

const phaseClassNameMap: Partial<Record<SnackbarPhase, string>> = {
  enter: styles.enter,
  exit: styles.exit,
};

const feedbackIconName: Record<SnackbarFeedbackVariant, IconName> = {
  positive: "check-line",
  destructive: "error-warning-octagon-line",
  notifying: "alert-line",
};

export const Snackbar = ({
  id,
  feedback = "none",
  description,
  label,
  onClick,
  onRemove,
  title,
  isClosing,
  duration = SNACKBAR_DEFAULT_DURATION,
  withCloseButton = false,
}: SnackbarProps) => {
  const [phase, setPhase] = useState<SnackbarPhase>("enter");
  const hasDescription = Boolean(description);

  useEffect(() => {
    if (phase === "enter") {
      const timer = setTimeout(() => setPhase("static"), SNACKBAR_ANIMATION_TIMER.ENTER);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "static") {
      if (duration === Infinity) return;
      const timer = setTimeout(() => setPhase("exit"), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, phase]);

  useEffect(() => {
    if (phase === "exit") {
      const timer = setTimeout(() => {
        onRemove?.();
      }, SNACKBAR_ANIMATION_TIMER.EXIT);
      return () => clearTimeout(timer);
    }
  }, [phase, onRemove]);

  useEffect(() => {
    if (isClosing) setPhase("exit");
  }, [isClosing]);

  const onClose = () => setPhase("exit");
  const phaseClassName = phaseClassNameMap[phase];
  const iconName = feedback !== "none" && feedbackIconName[feedback];

  return (
    <div id={id} className={clsx(styles.root({ feedback, withCloseButton }), phaseClassName)}>
      {iconName && <Icon name={iconName} size='sm' className={styles.icon({ feedback })} />}
      <div className={styles.body}>
        <div className={styles.content({ withDescription: hasDescription })}>
          <span className={clsx(styles.title, getLabelClassName({ size: "md", weight: "normal" }))}>
            {title}
          </span>
          {description && (
            <span
              className={clsx(
                styles.description,
                getBodyClassName({ size: "xs", weight: "normal" }),
              )}
            >
              {description}
            </span>
          )}
        </div>
        <div className={styles.actions}>
          <LabelButton
            hierarchy='primary'
            size='md'
            aria-label={`${title} 알림 ${label}`}
            onClick={onClick}
          >
            {label}
          </LabelButton>
          {withCloseButton && (
            <IconButton
              icon='close-line'
              hierarchy='tertiary'
              size='sm'
              aria-label={`${title} 알림 닫기`}
              onClick={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Snackbar.displayName = "Snackbar";
