import { clsx } from "clsx";
import { useEffect, useState } from "react";

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
}: ToastProps) => {
  const [phase, setPhase] = useState<ToastPhase>("enter");
  const hasDescription = Boolean(description);

  const onAnimationEnd = () => {
    if (phase === "enter") {
      setPhase("static");
      return;
    }

    if (phase === "exit") {
      onRemove?.();
    }
  };

  useEffect(() => {
    if (phase === "static") {
      const timer = setTimeout(() => setPhase("exit"), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (isClosing) setPhase("exit");
  }, [isClosing]);

  const phaseClassName = phaseClassNameMap[phase];
  const iconName = feedback !== "none" && feedbackIconName[feedback];

  return (
    <div
      id={id}
      className={clsx(styles.root({ feedback }), phaseClassName)}
      onAnimationEnd={onAnimationEnd}
    >
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
