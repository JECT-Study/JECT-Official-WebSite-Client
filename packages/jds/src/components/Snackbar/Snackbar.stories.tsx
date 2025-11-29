import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";

import { Snackbar } from "./Snackbar";
import { snackbarController } from "./snackbarController";
import { SnackbarProvider, useSnackbar } from "./SnackbarProvider";

import { BlockButton } from "@/components";

const meta: Meta<typeof Snackbar.Basic> = {
  title: "Components/Snackbar",
  component: Snackbar.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "스낵바 타이틀 텍스트입니다.",
      control: "text",
    },
    prefixButtonProps: {
      description: "스낵바 보조 버튼입니다.",
    },
    suffixButtonProps: {
      description: "스낵바 메인 버튼입니다.",
    },
    caption: {
      description: "본문 아래에 표시되는 캡션 텍스트입니다.",
      control: "text",
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof Snackbar.Basic> = {
  args: {
    title: "스낵바 제목 레이블",
    caption:
      "스낵바 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.",
    prefixButtonProps: {
      children: "레이블",
    },
    suffixButtonProps: {
      children: "레이블",
    },
  },
  render: args => (
    <Snackbar.Basic
      id='snackbar-1'
      title={args.title}
      caption={args.caption}
      prefixButtonProps={args.prefixButtonProps}
      suffixButtonProps={args.suffixButtonProps}
    />
  ),
};

export const Feedback: StoryObj<typeof Snackbar.Feedback> = {
  argTypes: {
    variant: {
      description: "스낵바 피드백 속성을 지정합니다.",
      control: "radio",
      options: ["positive", "destructive"],
    },
  },
  args: {
    variant: "positive",
    title: "스낵바 제목 레이블",
    caption:
      "스낵바 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.",
    prefixButtonProps: {
      children: "레이블",
    },
    suffixButtonProps: {
      children: "레이블",
    },
  },
  render: args => (
    <Snackbar.Feedback
      id='snackbar-1'
      title={args.title}
      variant={args.variant}
      caption={args.caption}
      prefixButtonProps={args.prefixButtonProps}
      suffixButtonProps={args.suffixButtonProps}
    />
  ),
};

export const UseSnackbarProvider: StoryObj<typeof Snackbar.Basic> = {
  parameters: {
    docs: {
      description: {
        story:
          "useSnackbar훅을 사용하여 토스트를 호출할 수 있습니다. use훅을 사용하기 위해서는 루트 컴포넌트 레벨에서 SnackbarProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => {
    const { snackbar } = useSnackbar();

    const basicSnackbar = () => snackbar.basic({ title: "베이직 스낵바" });
    const positiveSnackbar = () => snackbar.positive({ title: "피드백 스낵바 - positive" });
    const destructiveSnackbar = () =>
      snackbar.destructive({ title: "피드백 스낵바 - destructive" });

    return (
      <FlexColumn>
        <BlockButton.Basic onClick={basicSnackbar} variant='outlined'>
          Basic
        </BlockButton.Basic>
        <BlockButton.Feedback onClick={positiveSnackbar} intent='positive'>
          Feedback
        </BlockButton.Feedback>
        <BlockButton.Feedback onClick={destructiveSnackbar} intent='destructive'>
          Feedback
        </BlockButton.Feedback>
      </FlexColumn>
    );
  },
};

export const UseSnackbarProviderWithOptions: StoryObj<typeof Snackbar.Basic> = {
  parameters: {
    docs: {
      description: {
        story:
          "useSnackbar훅을 사용하여 토스트를 호출할 수 있습니다. use훅을 사용하기 위해서는 루트 컴포넌트 레벨에서 SnackbarProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => {
    const { snackbar } = useSnackbar();

    const onClick = () => alert("클릭되었습니다.");

    const title = () => snackbar.basic({ title: "베이직 스낵바" });
    const titleCaption = () => snackbar.basic({ title: "베이직 스낵바", caption: "캡션입니다." });
    const titleButtons = () =>
      snackbar.basic({
        title: "베이직 스낵바",
        prefixButtonProps: { children: "레이블", onClick },
        suffixButtonProps: { children: "레이블", onClick },
      });
    const titleCaptionButtons = () =>
      snackbar.basic({
        title: "베이직 스낵바",
        caption: "캡션입니다.",
        prefixButtonProps: { children: "레이블", onClick },
        suffixButtonProps: { children: "레이블", onClick },
      });

    return (
      <FlexColumn>
        <BlockButton.Basic onClick={title} variant='outlined'>
          title
        </BlockButton.Basic>
        <BlockButton.Basic onClick={titleCaption} variant='outlined'>
          title + caption
        </BlockButton.Basic>
        <BlockButton.Basic onClick={titleButtons} variant='outlined'>
          title + buttons
        </BlockButton.Basic>
        <BlockButton.Basic onClick={titleCaptionButtons} variant='outlined'>
          title + caption + buttons
        </BlockButton.Basic>
      </FlexColumn>
    );
  },
};

export const UseGlobalToast: StoryObj<typeof Snackbar.Basic> = {
  parameters: {
    docs: {
      description: {
        story:
          "Axios interceptor와 같이 SnackbarProvider 외부에서 토스트를 띄워야하는 경우(useSnackbar훅을 사용할 수 없습 경우), 전역 snackbar 함수를 사용하여 토스트를 호출할 수 있습니다. 전역 snackbar 함수를 사용할 때도 SnackbarProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => {
    const caption =
      "토스트 내용은 최대 다섯 줄 까지 입력 가능하며, 더 많은 내용을 입력해야 하는 상황에서는 별도의 안내 페이지로 유도합니다.";

    const basicSnackbar = () => snackbarController.basic({ title: "베이직 스낵바", caption });
    const positiveSnackbar = () => snackbarController.positive({ title: "피드백 스낵바", caption });
    const destructiveSnackbar = () =>
      snackbarController.destructive({ title: "피드백 스낵바", caption });

    return (
      <FlexColumn>
        <BlockButton.Basic onClick={basicSnackbar} variant='outlined'>
          Basic
        </BlockButton.Basic>
        <BlockButton.Feedback onClick={positiveSnackbar} intent='positive'>
          Feedback
        </BlockButton.Feedback>
        <BlockButton.Feedback onClick={destructiveSnackbar} intent='destructive'>
          Feedback
        </BlockButton.Feedback>
      </FlexColumn>
    );
  },
};
