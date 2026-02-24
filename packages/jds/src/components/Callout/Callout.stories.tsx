import type { Meta, StoryObj } from "@storybook/react-vite";

import { Callout } from "./Callout";

const meta = {
  title: "Components/Callout",
  component: Callout.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    hierarchy: { control: "radio", options: ["primary", "secondary"] },
    size: { control: "radio", options: ["lg", "md", "sm", "xs"] },
    title: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Callout.Basic>;

export default meta;

export const CalloutBasic: StoryObj<typeof Callout.Basic> = {
  name: "Basic",
  argTypes: {
    hierarchy: { control: "radio", options: ["primary", "secondary"] },
  },
  args: {
    hierarchy: "primary",
    size: "lg",
    title: "베이직 콜아웃 타이틀",
    labelButtonProps: {
      children: "레이블",
      disabled: false,
      prefixIcon: "blank",
      suffixIcon: "blank",
    },
    children:
      "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.",
  },
  render: args => (
    <Callout.Basic
      hierarchy={args.hierarchy}
      size={args.size}
      title={args.title}
      labelButtonProps={args.labelButtonProps}
    >
      {args.children}
    </Callout.Basic>
  ),
};

export const CalloutFeedback: StoryObj<typeof Callout.Feedback> = {
  name: "Feedback",
  argTypes: {
    feedback: { control: "radio", options: ["positive", "destructive", "notifying"] },
  },
  args: {
    feedback: "positive",
    size: "lg",
    title: "피드백 콜아웃 타이틀",
    labelButtonProps: {
      children: "레이블",
      disabled: false,
      prefixIcon: "blank",
      suffixIcon: "blank",
    },
    children:
      "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.",
  },
  render: args => (
    <Callout.Feedback
      feedback={args.feedback}
      size={args.size}
      title={args.title}
      labelButtonProps={args.labelButtonProps}
    >
      {args.children}
    </Callout.Feedback>
  ),
};
