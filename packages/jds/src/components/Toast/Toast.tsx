import { clsx } from "clsx";
import { useEffect, useState } from "react";

import * as styles from "./toast.css";
import type { ToastProps, ToastFeedbackVariant } from "./toast.types";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";

import { getBodyClassName, getLabelClassName } from "@/utils/typography";

type ToastPhase = "enter" | "static" | "exit";

/**
 * enter/exit 값은 toast.css.ts의 animation duration 토큰과 동기화한다.
 */
export const TOAST_TIMER = {
  DURATION: 2500,
  ENTER: 250,
  EXIT: 200,
  QUEUE_FALLBACK: 1500,
} as const;

const phaseClassNameMap: Partial<Record<ToastPhase, string>> = {
  enter: styles.enter,
  exit: styles.exit,
};

const feedbackIconName: Record<ToastFeedbackVariant, IconName> = {
  positive: "check-line",
  destructive: "error-warning-octagon-line",
  notifying: "alert-line",
};

export const Toast = ({
  id,
  feedback = "none",
  description,
  onRemove,
  title,
  isClosing,
  duration = TOAST_TIMER.DURATION,
}: ToastProps) => {
  const [phase, setPhase] = useState<ToastPhase>("enter");
  const hasDescription = Boolean(description);

  useEffect(() => {
    if (phase === "enter") {
      const timer = setTimeout(() => setPhase("static"), TOAST_TIMER.ENTER);
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
      }, TOAST_TIMER.EXIT);
      return () => clearTimeout(timer);
    }
  }, [phase, onRemove]);

  useEffect(() => {
    if (isClosing) setPhase("exit");
  }, [isClosing]);

  const phaseClassName = phaseClassNameMap[phase];
  const iconName = feedback !== "none" && feedbackIconName[feedback];

  return (
    <div id={id} className={clsx(styles.root({ feedback }), phaseClassName)}>
      {iconName && <Icon name={iconName} size='sm' className={styles.icon({ feedback })} />}
      <div className={styles.content({ withDescription: hasDescription })}>
        <span className={clsx(styles.label, getLabelClassName({ size: "md", weight: "normal" }))}>
          {title}
        </span>
        {description && (
          <span
            className={clsx(styles.description, getBodyClassName({ size: "xs", weight: "normal" }))}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

Toast.displayName = "Toast";
