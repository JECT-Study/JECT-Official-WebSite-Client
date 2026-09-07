import { clsx } from "clsx";
import type { FocusEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SNACKBAR_ANIMATION_TIMER, SNACKBAR_DEFAULT_DURATION } from "./snackbar.constants";
import * as styles from "./snackbar.css";
import type { SnackbarFeedbackVariant, SnackbarProps } from "./snackbar.types";
import { IconButton } from "../Button/IconButton";
import { LabelButton } from "../Button/LabelButton";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";

import { getBodyClassName, getLabelClassName } from "@/utils/typography";

type SnackbarPhase = "enter" | "static" | "exit";
type AutoDismissPauseReason = "hover" | "focus";

const phaseClassNameMap: Partial<Record<SnackbarPhase, string>> = {
  enter: styles.enter,
  exit: styles.exit,
};

const feedbackIconName: Record<SnackbarFeedbackVariant, IconName> = {
  positive: "check",
  destructive: "octagon-alert",
  notifying: "triangle-alert",
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

  // Provider 리렌더로 onRemove가 바뀌어도 exit 타이머가 재시작되지 않도록 최신 콜백만 보관한다.
  const onRemoveRef = useRef(onRemove);

  // hover/focus로 자동 닫힘을 멈춘 뒤, 남은 시간만큼 이어서 재개하기 위한 타이머 상태.
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitDeadlineRef = useRef(0);
  const remainingDurationRef = useRef(duration);
  const pauseReasonsRef = useRef<Set<AutoDismissPauseReason>>(new Set());

  const clearExitTimer = useCallback(() => {
    if (!exitTimerRef.current) return;
    clearTimeout(exitTimerRef.current);
    exitTimerRef.current = null;
  }, []);

  const startExitTimer = useCallback(
    (delay: number) => {
      clearExitTimer();

      if (delay <= 0) {
        setPhase("exit");
        return;
      }

      remainingDurationRef.current = delay;
      // pause 시점에 남은 시간을 계산하기 위해 자동 닫힘 예정 시각을 기록한다.
      exitDeadlineRef.current = Date.now() + delay;
      exitTimerRef.current = setTimeout(() => setPhase("exit"), delay);
    },
    [clearExitTimer],
  );

  const pauseAutoDismiss = (reason: AutoDismissPauseReason) => {
    pauseReasonsRef.current.add(reason);
    if (duration === Infinity || phase !== "static" || !exitTimerRef.current) return;

    remainingDurationRef.current = Math.max(0, exitDeadlineRef.current - Date.now());
    clearExitTimer();
  };

  const resumeAutoDismiss = (reason: AutoDismissPauseReason) => {
    pauseReasonsRef.current.delete(reason);
    // hover와 focus가 동시에 걸린 경우, 모든 상호작용이 끝난 뒤에만 재개한다.
    if (duration === Infinity || phase !== "static" || pauseReasonsRef.current.size > 0) return;

    startExitTimer(remainingDurationRef.current);
  };

  useEffect(() => {
    if (phase === "enter") {
      const timer = setTimeout(() => setPhase("static"), SNACKBAR_ANIMATION_TIMER.ENTER);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "static") {
      if (duration === Infinity) return;
      remainingDurationRef.current = duration;

      if (pauseReasonsRef.current.size === 0) startExitTimer(duration);
      return clearExitTimer;
    }
    clearExitTimer();
  }, [clearExitTimer, duration, phase, startExitTimer]);

  useEffect(() => {
    onRemoveRef.current = onRemove;
  }, [onRemove]);

  useEffect(() => {
    if (phase === "exit") {
      const timer = setTimeout(() => {
        onRemoveRef.current?.();
      }, SNACKBAR_ANIMATION_TIMER.EXIT);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (isClosing) setPhase("exit");
  }, [isClosing]);

  const handleMouseEnter = () => pauseAutoDismiss("hover");
  const handleMouseLeave = () => resumeAutoDismiss("hover");
  const handleFocus = () => pauseAutoDismiss("focus");
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    // 내부 버튼 사이에서 포커스가 이동하는 경우 자동 닫힘을 재개하지 않는다.
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
    resumeAutoDismiss("focus");
  };

  const onClose = () => setPhase("exit");

  const phaseClassName = phaseClassNameMap[phase];
  const iconName = feedback !== "none" && feedbackIconName[feedback];
  const titleId = `${id}-title`;

  return (
    <div
      id={id}
      className={clsx(styles.root({ feedback, withCloseButton }), phaseClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {iconName && <Icon name={iconName} size='sm' className={styles.icon({ feedback })} />}
      <div className={styles.body}>
        <div className={styles.content({ withDescription: hasDescription })}>
          <span
            id={titleId}
            className={clsx(styles.title, getLabelClassName({ size: "md", weight: "normal" }))}
          >
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
          <LabelButton hierarchy='primary' size='md' aria-describedby={titleId} onClick={onClick}>
            {label}
          </LabelButton>
          {withCloseButton && (
            <IconButton
              icon='x'
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
