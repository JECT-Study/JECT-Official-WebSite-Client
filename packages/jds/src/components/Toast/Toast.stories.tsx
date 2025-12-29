import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";

import { Toast } from "./Toast";
import { toastController } from "./toastController";
import { ToastProvider, useToast } from "./ToastProvider";
import { BlockButton } from "../Button/BlockButton";

const meta: Meta<typeof Toast.Basic> = {
  title: "Components/Toast",
  component: Toast.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "토스트 타이틀 텍스트입니다.",
      control: "text",
    },
    caption: {
      description: "본문 아래에 표시되는 캡션 텍스트입니다.",
      control: "text",
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof Toast.Basic> = {
  args: {
    title: "토스트 제목 레이블",
    caption:
      "토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.",
  },
  render: args => <Toast.Basic id={"toast-1"} title={args.title} caption={args.caption} />,
};

export const Feedback: StoryObj<typeof Toast.Feedback> = {
  argTypes: {
    variant: {
      description: "토스트 피드백 속성을 지정합니다.",
      control: "radio",
      options: ["positive", "destructive"],
    },
  },
  args: {
    variant: "positive",
    title: "토스트 제목 레이블",
    caption:
      "토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.",
  },
  render: args => (
    <Toast.Feedback
      id={"toast-1"}
      title={args.title}
      variant={args.variant}
      caption={args.caption}
    />
  ),
};

export const UseToastProvider: StoryObj<typeof Toast.Basic> = {
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
    const caption =
      "토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.";

    const basicToast = () => toast.basic("베이직 토스트");
    const positiveToast = () => toast.positive("피드백 토스트 - positive");
    const destructiveToast = () => toast.destructive("피드백 토스트 - destructive");

    const basicToastCaption = () => toast.basic("베이직 토스트", caption);
    const positiveToastCaption = () => toast.positive("피드백 토스트 - positive", caption);
    const destructiveToastCaption = () => toast.destructive("피드백 토스트 - destructive", caption);

    return (
      <FlexRow>
        <FlexColumn>
          <Label>only Title</Label>
          <BlockButton.Basic onClick={basicToast} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToast} intent='positive'>
            Feedback
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToast} intent='destructive'>
            Feedback
          </BlockButton.Feedback>
        </FlexColumn>
        <FlexColumn>
          <Label>with caption</Label>
          <BlockButton.Basic onClick={basicToastCaption} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToastCaption} intent='positive'>
            Feedback
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToastCaption} intent='destructive'>
            Feedback
          </BlockButton.Feedback>
        </FlexColumn>
      </FlexRow>
    );
  },
};

export const UseGlobalToast: StoryObj<typeof Toast.Basic> = {
  parameters: {
    docs: {
      description: {
        story:
          "Axios interceptor와 같이 ToastProvider 외부에서 토스트를 띄워야하는 경우(useToast훅을 사용할 수 없습 경우), 전역 toast 함수를 사용하여 토스트를 호출할 수 있습니다. 전역 toast 함수를 사용할 때도 ToastProvider 작성이 필요합니다.",
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
    const caption =
      "토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.";

    const basicToast = () => toastController.basic("베이직 토스트");
    const positiveToast = () => toastController.positive("피드백 토스트");
    const destructiveToast = () => toastController.destructive("피드백 토스트");

    const basicToastCaption = () => toastController.basic("베이직 토스트", caption);
    const positiveToastCaption = () =>
      toastController.positive("피드백 토스트 - positive", caption);
    const destructiveToastCaption = () =>
      toastController.destructive("피드백 토스트 - destructive", caption);

    return (
      <FlexRow>
        <FlexColumn>
          <Label>only Title</Label>
          <BlockButton.Basic onClick={basicToast} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToast} intent='positive'>
            Feedback
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToast} intent='destructive'>
            Feedback
          </BlockButton.Feedback>
        </FlexColumn>
        <FlexColumn>
          <Label>with caption</Label>
          <BlockButton.Basic onClick={basicToastCaption} variant='outlined'>
            Basic
          </BlockButton.Basic>
          <BlockButton.Feedback onClick={positiveToastCaption} intent='positive'>
            Feedback
          </BlockButton.Feedback>
          <BlockButton.Feedback onClick={destructiveToastCaption} intent='destructive'>
            Feedback
          </BlockButton.Feedback>
        </FlexColumn>
      </FlexRow>
    );
  },
};
