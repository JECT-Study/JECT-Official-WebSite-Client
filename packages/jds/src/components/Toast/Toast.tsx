import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

import { TOAST_ANIMATION_TIMER, TOAST_DEFAULT_DURATION } from "./toast.constants";
import * as styles from "./toast.css";
import type { ToastProps, ToastFeedbackVariant } from "./toast.types";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";

import { getBodyClassName, getLabelClassName } from "@/utils/typography";

type ToastPhase = "enter" | "static" | "exit";

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
  duration = TOAST_DEFAULT_DURATION,
}: ToastProps) => {
  const [phase, setPhase] = useState<ToastPhase>("enter");
  const hasDescription = Boolean(description);

  // Provider 리렌더로 onRemove가 바뀌어도 exit 타이머가 재시작되지 않도록 최신 콜백만 보관한다.
  const onRemoveRef = useRef(onRemove);

  useEffect(() => {
    if (phase === "enter") {
      const timer = setTimeout(() => setPhase("static"), TOAST_ANIMATION_TIMER.ENTER);
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
    onRemoveRef.current = onRemove;
  }, [onRemove]);

  useEffect(() => {
    if (phase === "exit") {
      const timer = setTimeout(() => {
        onRemoveRef.current?.();
      }, TOAST_ANIMATION_TIMER.EXIT);
      return () => clearTimeout(timer);
    }
  }, [phase]);

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
