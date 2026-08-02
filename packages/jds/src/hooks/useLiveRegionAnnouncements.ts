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
 * 알림 큐의 최신 항목을 피드백 유형에 맞는 live region 낭독 문구로 관리하는 훅.
 *
 * destructive 항목은 alert, 나머지 항목은 status announcement로 분리하고,
 * 큐에서 제거된 항목의 문구를 해당 live region에서 정리한다.
 */
export const useLiveRegionAnnouncements = <T extends LiveRegionItem>(items: T[]) => {
  const [statusAnnouncement, setStatusAnnouncement] = useState<LiveAnnouncement | null>(null);
  const [alertAnnouncement, setAlertAnnouncement] = useState<LiveAnnouncement | null>(null);

  const statusAnnouncementSpaceToggleRef = useRef(false);
  const alertAnnouncementSpaceToggleRef = useRef(false);
  const announcedItemIdsRef = useRef<Set<string>>(new Set());

  const latestItem = items.length > 0 ? items[items.length - 1] : null;

  const latestItemId = latestItem?.id;
  const latestItemTitle = latestItem?.title;
  const latestItemDescription = latestItem?.description;
  const latestItemFeedback = latestItem?.feedback;

  useEffect(() => {
    if (!latestItemId) return;

    /**
     * 최신 항목이 먼저 제거되면 이미 낭독한 이전 항목이 다시 latest가 될 수 있다.
     * 신규 id만 live region에 반영해 같은 항목이 반복 낭독되지 않도록 한다.
     */
    if (announcedItemIdsRef.current.has(latestItemId)) return;
    announcedItemIdsRef.current.add(latestItemId);

    const baseText = [latestItemTitle, latestItemDescription].filter(Boolean).join(" ");

    /**
     * VoiceOver는 live region에 이전과 동일한 문자열이 다시 들어오면 낭독을 건너뛸 수 있다.
     * 사용자에게 들리지 않는 zero-width space를 1개/2개로 번갈아 붙여 각 영역의
     * DOM 텍스트 변경을 보장한다. 교차 알림에서도 같은 state가 되지 않도록
     * status와 alert의 toggle은 독립적으로 관리한다.
     */
    if (latestItemFeedback === "destructive") {
      alertAnnouncementSpaceToggleRef.current = !alertAnnouncementSpaceToggleRef.current;
      const invisibleSpace = alertAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
      setAlertAnnouncement({ id: latestItemId, text: `${baseText}${invisibleSpace}` });
    } else {
      statusAnnouncementSpaceToggleRef.current = !statusAnnouncementSpaceToggleRef.current;
      const invisibleSpace = statusAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
      setStatusAnnouncement({ id: latestItemId, text: `${baseText}${invisibleSpace}` });
    }
  }, [latestItemId, latestItemTitle, latestItemDescription, latestItemFeedback]);

  useEffect(() => {
    // 제거된 항목을 낭독 완료 목록과 live region에서 함께 정리한다.
    const activeItemIds = new Set(items.map(item => item.id));

    announcedItemIdsRef.current.forEach(id => {
      if (!activeItemIds.has(id)) announcedItemIdsRef.current.delete(id);
    });

    setStatusAnnouncement(current => (current && !activeItemIds.has(current.id) ? null : current));
    setAlertAnnouncement(current => (current && !activeItemIds.has(current.id) ? null : current));
  }, [items]);

  return {
    statusAnnouncement: statusAnnouncement?.text,
    alertAnnouncement: alertAnnouncement?.text,
  };
};
