import { useEffect, useRef, useState } from "react";

interface LiveRegionItem {
  id: string;
  title: string;
  description?: string;
  feedback: string;
}

interface LiveAnnouncement {
  id: string;
  text: string;
}

/**
 * 알림 큐의 alert/status 채널별 최신 항목을 live region 낭독 문구로 관리하는 훅.
 *
 * destructive 항목은 alert, 나머지 항목은 status 채널로 분리한다. 같은 렌더에
 * 동일한 alert/status 채널의 항목이 여러 개 추가되면 가장 최근 항목만 낭독하고, 이전 항목이
 * 큐 변경 후 뒤늦게 낭독되지 않도록 함께 처리 완료로 기록한다.
 * 큐에서 제거된 항목의 문구는 해당 live region에서 정리한다.
 * 액션 라벨 선택자가 전달되면 낭독 문구에 사용 가능한 작업도 함께 안내한다.
 */
export const useLiveRegionAnnouncements = <T extends LiveRegionItem>(
  items: T[],
  getActionLabel?: (item: T) => string | undefined,
) => {
  const [statusAnnouncement, setStatusAnnouncement] = useState<LiveAnnouncement | null>(null);
  const [alertAnnouncement, setAlertAnnouncement] = useState<LiveAnnouncement | null>(null);

  const statusAnnouncementSpaceToggleRef = useRef(false);
  const alertAnnouncementSpaceToggleRef = useRef(false);
  const handledItemIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    /**
     * 같은 렌더에 여러 항목이 추가되면 alert/status 채널별 최신 항목만 낭독한다.
     * 선택되지 않은 이전 항목도 처리 완료로 기록해, 최신 항목이 제거된 뒤
     * 큐의 마지막 항목이 되더라도 뒤늦게 낭독되지 않도록 한다.
     */
    const pendingItems = items.filter(item => !handledItemIdsRef.current.has(item.id));
    if (pendingItems.length === 0) return;

    pendingItems.forEach(item => handledItemIdsRef.current.add(item.id));

    const latestAlertItem = [...pendingItems]
      .reverse()
      .find(item => item.feedback === "destructive");
    const latestStatusItem = [...pendingItems]
      .reverse()
      .find(item => item.feedback !== "destructive");

    const createAnnouncementText = (item: T) => {
      const actionLabel = getActionLabel?.(item);
      const actionText = actionLabel ? `${actionLabel} 버튼이 있습니다.` : undefined;

      return [item.title, item.description, actionText].filter(Boolean).join(" ");
    };

    /**
     * VoiceOver는 live region에 이전과 동일한 문자열이 다시 들어오면 낭독을 건너뛸 수 있다.
     * 사용자에게 들리지 않는 zero-width space를 1개/2개로 번갈아 붙여 각 영역의
     * DOM 텍스트 변경을 보장한다. 교차 알림에서도 같은 state가 되지 않도록
     * status와 alert의 toggle은 독립적으로 관리한다.
     */
    if (latestAlertItem) {
      alertAnnouncementSpaceToggleRef.current = !alertAnnouncementSpaceToggleRef.current;
      const invisibleSpace = alertAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
      setAlertAnnouncement({
        id: latestAlertItem.id,
        text: `${createAnnouncementText(latestAlertItem)}${invisibleSpace}`,
      });
    }

    if (latestStatusItem) {
      statusAnnouncementSpaceToggleRef.current = !statusAnnouncementSpaceToggleRef.current;
      const invisibleSpace = statusAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
      setStatusAnnouncement({
        id: latestStatusItem.id,
        text: `${createAnnouncementText(latestStatusItem)}${invisibleSpace}`,
      });
    }
  }, [items, getActionLabel]);

  useEffect(() => {
    // 제거된 항목을 처리 완료 목록과 live region에서 함께 정리한다.
    const activeItemIds = new Set(items.map(item => item.id));

    handledItemIdsRef.current.forEach(id => {
      if (!activeItemIds.has(id)) handledItemIdsRef.current.delete(id);
    });

    setStatusAnnouncement(current => (current && !activeItemIds.has(current.id) ? null : current));
    setAlertAnnouncement(current => (current && !activeItemIds.has(current.id) ? null : current));
  }, [items]);

  return {
    statusAnnouncement: statusAnnouncement?.text,
    alertAnnouncement: alertAnnouncement?.text,
  };
};
