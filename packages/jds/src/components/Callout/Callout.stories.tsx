import type { Meta, StoryObj } from "@storybook/react-vite";

import { Callout } from "./Callout";

const meta = {
  title: "Components/Callout",
  component: Callout.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: { control: "radio", options: ["hero", "hint"] },
    hierarchy: { control: "radio", options: ["accent", "primary", "secondary"] },
    size: { control: "radio", options: ["lg", "md", "sm", "xs", "2xs"] },
    title: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Callout.Basic>;

export default meta;

export const CalloutBasic: StoryObj<typeof Callout.Basic> = {
  name: "Basic",
  argTypes: {
    hierarchy: { control: "radio", options: ["accent", "primary", "secondary"] },
  },
  args: {
    hierarchy: "accent",
    variant: "hero",
    size: "lg",
    title: "베이직 콜아웃 타이틀",
    blockButtonProps: {
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
      variant={args.variant}
      size={args.size}
      title={args.title}
      blockButtonProps={args.blockButtonProps}
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
    variant: "hero",
    size: "lg",
    title: "피드백 콜아웃 타이틀",
    blockButtonProps: {
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
      variant={args.variant}
      size={args.size}
      title={args.title}
      blockButtonProps={args.blockButtonProps}
    >
      {args.children}
    </Callout.Feedback>
  ),
};
