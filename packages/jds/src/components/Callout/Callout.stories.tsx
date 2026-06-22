import type { Meta, StoryObj } from "@storybook/react-vite";

import { Callout } from "./Callout";
import type { CalloutFeedback, CalloutSize } from "./Callout.types";
import { iconMap } from "../Icon/IconMap";

const CALLOUT_SIZES: CalloutSize[] = ["lg", "md", "sm", "xs"];
const CALLOUT_FEEDBACKS: CalloutFeedback[] = ["none", "positive", "destructive", "notifying"];

const meta = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "중요 텍스트를 강조하거나 추가 설명을 제공하는 메시지 영역입니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: CALLOUT_SIZES,
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
    icon: {
      control: "select",
      options: Object.keys(iconMap),
      description: "타이틀 앞 아이콘 이름 (Icon 컴포넌트, 지정 시에만 아이콘 표시)",
      table: {
        defaultValue: { summary: "vector" },
      },
    },
    feedback: {
      control: "radio",
      options: CALLOUT_FEEDBACKS,
      description: "피드백 상태",
      table: {
        defaultValue: { summary: "none" },
      },
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "일반적인 주요 고지나 부가 설명을 전달할 때 사용합니다.",
      },
    },
  },
  args: {
    feedback: "none",
    size: "lg",
    title: "베이직 콜아웃 타이틀",
    icon: "vector",
    children:
      "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.",
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
    icon: "vector",
    children:
      "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.",
  },
  render: ({ title, icon, size, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      {CALLOUT_FEEDBACKS.map(feedback =>
        title ? (
          <Callout key={feedback} feedback={feedback} size={size} title={title} icon={icon}>
            {children}
          </Callout>
        ) : (
          <Callout key={feedback} feedback={feedback} size={size}>
            {children}
          </Callout>
        ),
      )}
    </div>
  ),
};
