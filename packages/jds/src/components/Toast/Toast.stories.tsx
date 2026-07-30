import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useEffect, useRef, useState } from "react";
import { visuallyHidden } from "utils";

import { Toast } from "./Toast";
import { toastController } from "./toastController";
import { ToastProvider, useToast } from "./ToastProvider";
import { BlockButton } from "../Button/BlockButton";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "토스트 타이틀 텍스트입니다.",
      control: "text",
    },
    description: {
      description: "본문 아래에 표시되는 설명 텍스트입니다.",
      control: "text",
    },
    duration: {
      description: "토스트가 유지되는 시간입니다. 단위는 ms입니다.",
      control: "number",
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof Toast> = {
  args: {
    feedback: "none",
    title: "토스트 레이블",
    description: "설명 텍스트",
    duration: Infinity,
  },
  render: ({ id = "toast-1", ...args }) => <Toast id={id} {...args} />,
};

export const Feedback: StoryObj<typeof Toast> = {
  argTypes: {
    feedback: {
      description: "토스트 피드백 속성을 지정합니다.",
      control: "radio",
      options: ["none", "positive", "destructive", "notifying"],
    },
  },
  args: {
    feedback: "positive",
    title: "토스트 제목 레이블",
    description: "설명 텍스트",
    duration: Infinity,
  },
  render: ({ id = "toast-1", ...args }) => <Toast id={id} {...args} />,
};

export const UseToastProvider: StoryObj<typeof Toast> = {
  parameters: {
    docs: {
      description: {
        story:
          "useToast훅을 사용하여 토스트를 호출할 수 있습니다. useToast훅을 사용하기 위해서는 루트 컴포넌트 레벨에서 ToastProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => {
    const { toast } = useToast();
    const description =
      "토스트의 맥락과 목적을 레이블만으로 충분히 설명할 수 없을 때 보조적인 설명을 작성합니다.";

    const basicToast = () => toast.basic("베이직 토스트");
    const positiveToast = () => toast.positive("피드백 토스트 - positive");
    const destructiveToast = () => toast.destructive("피드백 토스트 - destructive");
    const notifyingToast = () => toast.notifying("피드백 토스트 - notifying");

    const basicToastDescription = () => toast.basic("베이직 토스트", { description });
    const positiveToastDescription = () =>
      toast.positive("피드백 토스트 - positive", { description });
    const destructiveToastDescription = () =>
      toast.destructive("피드백 토스트 - destructive", { description });
    const notifyingToastDescription = () =>
      toast.notifying("피드백 토스트 - notifying", { description });

    return (
      <FlexRow>
        <FlexColumn style={{ width: "150px" }}>
          <span>only Title</span>
          <BlockButton.Basic onClick={basicToast} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToast} intent='positive'>
            Positive
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToast} intent='destructive'>
            Destructive
          </BlockButton.Feedback>
          <BlockButton.Basic onClick={notifyingToast} hierarchy='accent' variant='solid'>
            Notifying
          </BlockButton.Basic>
        </FlexColumn>
        <FlexColumn style={{ width: "150px" }}>
          <span>with Description</span>
          <BlockButton.Basic onClick={basicToastDescription} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToastDescription} intent='positive'>
            Positive
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToastDescription} intent='destructive'>
            Destructive
          </BlockButton.Feedback>
          <BlockButton.Basic onClick={notifyingToastDescription} hierarchy='accent' variant='solid'>
            Notifying
          </BlockButton.Basic>
        </FlexColumn>
      </FlexRow>
    );
  },
};

const VoiceOverLiveRegionDemo = () => {
  const { toast } = useToast();
  const [articleAnnouncement, setArticleAnnouncement] = useState("");
  const articleAnnouncementSpaceToggleRef = useRef(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const articleText =
    "접근성 안내는 모든 사용자가 정보를 동등하게 이해하도록 돕습니다. 일반 상태는 현재 낭독을 방해하지 않고, 긴급 오류는 즉시 전달되는지 VoiceOver로 확인합니다.";

  const startArticleReading = () => {
    articleAnnouncementSpaceToggleRef.current = !articleAnnouncementSpaceToggleRef.current;
    const invisibleSpace = articleAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";

    setArticleAnnouncement(`${articleText} ${invisibleSpace}`);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const startTest = (feedback: "status" | "alert") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    startArticleReading();

    toastTimerRef.current = setTimeout(() => {
      if (feedback === "alert") {
        toast.destructive("긴급 오류가 발생했습니다.", {
          description: "현재 읽고 있는 본문을 중단하고 즉시 낭독해야 합니다.",
        });
      } else {
        toast.basic("일반 상태 안내입니다.", {
          description: "현재 낭독을 즉시 중단하지 않고 다음 가능한 시점에 안내해야 합니다.",
        });
      }
      toastTimerRef.current = null;
    }, 4000);
  };

  return (
    <FlexColumn gap='24px' style={{ width: "min(768px, calc(100vw - 32px))" }}>
      <Label style={{ width: "auto" }}>
        버튼을 누르면 본문 낭독이 시작되고 4초 뒤 해당 토스트가 자동으로 발생합니다. 두 테스트는 한
        번에 하나씩 실행하세요.
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
          <p>{articleText}</p>
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
            Status 비교 시작
          </BlockButton>
          <BlockButton feedback='destructive' onClick={() => startTest("alert")}>
            Alert 비교 시작
          </BlockButton>
        </FlexColumn>
      </FlexRow>
      <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
        {articleAnnouncement}
      </div>
    </FlexColumn>
  );
};

export const VoiceOverLiveRegion: StoryObj<typeof Toast> = {
  parameters: {
    docs: {
      description: {
        story:
          "각 버튼은 VoiceOver의 본문 낭독을 시작하고 4초 뒤 해당 토스트를 자동 호출합니다. status 토스트는 낭독을 즉시 끊지 않고 다음 자연스러운 시점에 읽히는지, alert 토스트는 낭독을 중단하고 즉시 읽히는지 비교합니다. 토스트는 확인할 수 있도록 15초간 유지됩니다.",
      },
    },
  },
  decorators: [
    Story => (
      <ToastProvider duration={15000}>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => <VoiceOverLiveRegionDemo />,
};

export const UseGlobalToast: StoryObj<typeof Toast> = {
  parameters: {
    docs: {
      description: {
        story:
          "Axios interceptor와 같이 ToastProvider 외부에서 토스트를 띄워야 하는 경우(useToast훅을 사용할 수 없는 경우), 전역 toast 함수를 사용하여 토스트를 호출할 수 있습니다. 전역 toast 함수를 사용할 때도 ToastProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => {
    const description =
      "토스트의 맥락과 목적을 레이블만으로 충분히 설명할 수 없을 때 보조적인 설명을 작성합니다.";

    const basicToast = () => toastController.basic("베이직 토스트");
    const positiveToast = () => toastController.positive("피드백 토스트 - positive");
    const destructiveToast = () => toastController.destructive("피드백 토스트 - destructive");
    const notifyingToast = () => toastController.notifying("피드백 토스트 - notifying");

    const basicToastDescription = () => toastController.basic("베이직 토스트", { description });
    const positiveToastDescription = () =>
      toastController.positive("피드백 토스트 - positive", { description });
    const destructiveToastDescription = () =>
      toastController.destructive("피드백 토스트 - destructive", { description });
    const notifyingToastDescription = () =>
      toastController.notifying("피드백 토스트 - notifying", { description });

    return (
      <FlexRow>
        <FlexColumn style={{ width: "150px" }}>
          <span>only Title</span>
          <BlockButton.Basic onClick={basicToast} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToast} intent='positive'>
            Positive
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToast} intent='destructive'>
            Destructive
          </BlockButton.Feedback>
          <BlockButton.Basic onClick={notifyingToast} hierarchy='accent' variant='solid'>
            Notifying
          </BlockButton.Basic>
        </FlexColumn>
        <FlexColumn style={{ width: "150px" }}>
          <span>with Description</span>
          <BlockButton.Basic onClick={basicToastDescription} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToastDescription} intent='positive'>
            Positive
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToastDescription} intent='destructive'>
            Destructive
          </BlockButton.Feedback>
          <BlockButton.Basic onClick={notifyingToastDescription} hierarchy='accent' variant='solid'>
            Notifying
          </BlockButton.Basic>
        </FlexColumn>
      </FlexRow>
    );
  },
};
