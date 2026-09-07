import { useEffect, useRef, useState } from "react";
import { visuallyHidden } from "utils";

import { FlexColumn, FlexRow, Label } from "./layout";

import { BlockButton } from "@/components/Button/BlockButton/BlockButton";

export type LiveRegionScenario = "status" | "alert" | "mixed" | "multiple-alerts";
export type NotificationType = "toast" | "snackbar";

interface LiveRegionDemoProps {
  notificationType: NotificationType;
  onNotify: (scenario: LiveRegionScenario) => void;
}

const notificationLabelMap: Record<NotificationType, string> = {
  toast: "토스트",
  snackbar: "스낵바",
};

const ARTICLE_TEXT =
  "접근성 안내는 모든 사용자가 정보를 동등하게 이해하도록 돕습니다. 일반 상태는 현재 낭독을 방해하지 않고, 긴급 오류는 즉시 전달되는지 VoiceOver로 확인합니다.";

const NOTIFICATION_DELAY = 4000;

export const LiveRegionDemo = ({ notificationType, onNotify }: LiveRegionDemoProps) => {
  const [articleAnnouncement, setArticleAnnouncement] = useState("");
  const articleAnnouncementSpaceToggleRef = useRef(false);

  const notificationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notificationLabel = notificationLabelMap[notificationType];

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
    };
  }, []);

  const startArticleReading = () => {
    articleAnnouncementSpaceToggleRef.current = !articleAnnouncementSpaceToggleRef.current;
    const invisibleSpace = articleAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";

    setArticleAnnouncement(`${ARTICLE_TEXT} ${invisibleSpace}`);
  };

  const startTest = (scenario: LiveRegionScenario) => {
    if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
    startArticleReading();

    notificationTimerRef.current = setTimeout(() => {
      onNotify(scenario);
      notificationTimerRef.current = null;
    }, NOTIFICATION_DELAY);
  };

  return (
    <FlexColumn gap='24px' style={{ width: "min(768px, calc(100vw - 32px))" }}>
      <Label style={{ width: "auto" }}>
        버튼을 누르면 본문 낭독이 시작되고 4초 뒤 해당 {notificationLabel}가 자동으로 발생합니다. 각
        테스트는 한 번에 하나씩 실행하세요. 동시 호출 테스트에서는 alert/status 채널별 최신 알림이
        각 live region에 반영되는지와 alert가 우선 안내되는지 확인하세요.
      </Label>
      <FlexRow
        gap='50px'
        style={{
          alignItems: "stretch",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "min(100%, 320px)",
            boxSizing: "border-box",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "rgba(127, 127, 127, 0.1)",
          }}
        >
          <h4 style={{ margin: 0 }}>VoiceOver 낭독 테스트용 본문</h4>
          <p>{ARTICLE_TEXT}</p>
        </div>
        <FlexColumn
          gap='12px'
          style={{
            flex: "0 0 180px",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <BlockButton variant='outlined' onClick={() => startTest("status")}>
            Status 호출
          </BlockButton>
          <BlockButton feedback='destructive' onClick={() => startTest("alert")}>
            Alert 호출
          </BlockButton>
          <BlockButton hierarchy='accent' variant='solid' onClick={() => startTest("mixed")}>
            Status + Alert 동시 호출
          </BlockButton>
          <BlockButton feedback='destructive' onClick={() => startTest("multiple-alerts")}>
            Alert 2개 동시 호출
          </BlockButton>
        </FlexColumn>
      </FlexRow>
      <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
        {articleAnnouncement}
      </div>
    </FlexColumn>
  );
};
