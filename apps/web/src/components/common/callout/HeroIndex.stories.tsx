import type { Meta, StoryObj } from "@storybook/react";

import HeroIndex from "./HeroIndex";

const meta: Meta<typeof HeroIndex> = {
  title: "Components/Hero/HeroIndex",
  component: HeroIndex,
  argTypes: {
    index: {
      control: "number",
    },
    title: {
      control: "text",
    },
    badgeText: {
      control: "text",
    },
    children: {
      control: "text",
    },
    badgeBgColor: {
      control: "text",
    },
    badgeTextColor: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeroIndex>;

export const HeroIndexStory: Story = {
  args: {
    index: 1,
    title: "히어로 타이틀",
    badgeText: "레이블",
    children: "히어로 내용",
    badgeBgColor: "bg-feedback-trans-information-dark",
    badgeTextColor: "text-feedback-information-dark",
  },
};
