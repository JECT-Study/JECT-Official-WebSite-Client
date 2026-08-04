import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { LiveRegionDemo, type LiveRegionScenario } from "@storybook-utils/LiveRegionDemo";

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
          <BlockButton variant='outlined' onClick={basicToast}>
            Basic
          </BlockButton>
          <BlockButton feedback='positive' onClick={positiveToast}>
            Positive
          </BlockButton>
          <BlockButton feedback='destructive' onClick={destructiveToast}>
            Destructive
          </BlockButton>
          <BlockButton hierarchy='accent' variant='solid' onClick={notifyingToast}>
            Notifying
          </BlockButton>
        </FlexColumn>
        <FlexColumn style={{ width: "150px" }}>
          <span>with Description</span>
          <BlockButton variant='outlined' onClick={basicToastDescription}>
            Basic
          </BlockButton>
          <BlockButton feedback='positive' onClick={positiveToastDescription}>
            Positive
          </BlockButton>
          <BlockButton feedback='destructive' onClick={destructiveToastDescription}>
            Destructive
          </BlockButton>
          <BlockButton hierarchy='accent' variant='solid' onClick={notifyingToastDescription}>
            Notifying
          </BlockButton>
        </FlexColumn>
      </FlexRow>
    );
  },
};

const ToastLiveRegionDemo = () => {
  const { toast } = useToast();

  const showNotification = (scenario: LiveRegionScenario) => {
    if (scenario === "mixed") {
      toast.destructive("동시에 발생한 긴급 오류입니다.");
      toast.basic("동시에 발생한 일반 상태 안내입니다.");
      return;
    }

    if (scenario === "multiple-alerts") {
      toast.destructive("먼저 발생한 긴급 오류입니다.");
      toast.destructive("가장 최근에 발생한 긴급 오류입니다.");
      return;
    }

    if (scenario === "alert") {
      toast.destructive("긴급 오류가 발생했습니다.", {
        description: "현재 읽고 있는 본문을 중단하고 즉시 낭독해야 합니다.",
      });
      return;
    }

    toast.basic("일반 상태 안내입니다.", {
      description: "현재 낭독을 즉시 중단하지 않고 다음 가능한 시점에 안내해야 합니다.",
    });
  };

  return <LiveRegionDemo notificationType='toast' onNotify={showNotification} />;
};

export const VoiceOverLiveRegion: StoryObj<typeof Toast> = {
  tags: ["skip-vrt"],
  parameters: {
    docs: {
      description: {
        story:
          "각 버튼은 VoiceOver의 본문 낭독을 시작하고 4초 뒤 해당 토스트를 자동 호출합니다. status와 alert의 낭독 시점을 비교하고, alert/status 두 채널을 동시에 호출하면 각 채널의 최신 알림이 live region에 반영되어 alert가 우선 안내되는지 확인합니다. alert를 두 개 동시에 호출하면 가장 최근 알림만 안내되어야 합니다.",
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
  render: () => <ToastLiveRegionDemo />,
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
          <BlockButton variant='outlined' onClick={basicToast}>
            Basic
          </BlockButton>
          <BlockButton feedback='positive' onClick={positiveToast}>
            Positive
          </BlockButton>
          <BlockButton feedback='destructive' onClick={destructiveToast}>
            Destructive
          </BlockButton>
          <BlockButton hierarchy='accent' variant='solid' onClick={notifyingToast}>
            Notifying
          </BlockButton>
        </FlexColumn>
        <FlexColumn style={{ width: "150px" }}>
          <span>with Description</span>
          <BlockButton variant='outlined' onClick={basicToastDescription}>
            Basic
          </BlockButton>
          <BlockButton feedback='positive' onClick={positiveToastDescription}>
            Positive
          </BlockButton>
          <BlockButton feedback='destructive' onClick={destructiveToastDescription}>
            Destructive
          </BlockButton>
          <BlockButton hierarchy='accent' variant='solid' onClick={notifyingToastDescription}>
            Notifying
          </BlockButton>
        </FlexColumn>
      </FlexRow>
    );
  },
};
