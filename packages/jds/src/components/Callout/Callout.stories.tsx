import type { Meta, StoryObj } from "@storybook/react-vite";

import { Callout } from "./Callout";

const meta = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Callout 컴포넌트는 Basic 모드(hierarchy)와 Feedback 모드(feedback)를 지원합니다. 두 속성은 동시에 사용할 수 없습니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md", "sm", "xs"],
      description: "Callout의 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    title: {
      control: "text",
      description: "Callout 타이틀",
    },
    children: {
      control: "text",
      description: "Callout 본문 내용",
    },
    labelButtonProps: {
      control: "object",
      description: "우측 버튼 설정 (옵션)",
    },
    hierarchy: {
      control: "radio",
      options: ["primary", "secondary"],
      description: "중요도 단계",
      table: {
        defaultValue: { summary: "secondary" },
      },
    },
    feedback: {
      control: "radio",
      options: ["positive", "destructive", "notifying"],
      description: "피드백 상태",
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Basic Mode",
  parameters: {
    docs: {
      description: {
        story: "**Basic Mode**는 `hierarchy` prop을 사용하여 일반적인 정보를 전달할 때 사용합니다.",
      },
    },
  },
  args: {
    hierarchy: "primary",
    size: "lg",
    title: "베이직 콜아웃 타이틀",
    children:
      "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.",
    labelButtonProps: {
      children: "레이블",
      disabled: false,
      prefixIcon: "blank",
      suffixIcon: "blank",
    },
  },
};

export const Feedback: Story = {
  name: "Feedback Mode",
  parameters: {
    docs: {
      description: {
        story:
          "**Feedback Mode**는 `feedback` prop을 사용하여 상태(긍정, 부정, 알림)를 전달할 때 사용합니다.",
      },
    },
  },
  args: {
    title: "피드백 콜아웃 타이틀",
    children:
      "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.",
  },
  render: args => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <Callout
        feedback='positive'
        size={args.size}
        title={args.title}
        labelButtonProps={args.labelButtonProps}
      >
        {args.children}
      </Callout>
      <Callout
        feedback='destructive'
        size={args.size}
        title={args.title}
        labelButtonProps={args.labelButtonProps}
      >
        {args.children}
      </Callout>
      <Callout
        feedback='notifying'
        size={args.size}
        title={args.title}
        labelButtonProps={args.labelButtonProps}
      >
        {args.children}
      </Callout>
    </div>
  ),
};
