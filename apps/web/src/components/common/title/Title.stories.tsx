import type { Meta, StoryObj } from "@storybook/react";

import Title from "./Title";

const meta: Meta<typeof Title> = {
  title: "Components/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Title에 들어갈 텍스트입니다.",
    },
    hierarchy: {
      control: "radio",
      options: ["stronger", "strong", "normal", "weak"],
      description: "Title의 계층을 나타냅니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Primary: Story = {
  args: {
    children: "타이틀",
    hierarchy: "stronger",
  },
};
