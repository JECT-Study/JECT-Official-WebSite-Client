import type { Meta, StoryObj } from "@storybook/react";

import CalloutNumerical from "./CalloutNumerical";

const meta: Meta<typeof CalloutNumerical> = {
  title: "Components/Callout/CalloutNumerical",
  component: CalloutNumerical,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    labelText: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CalloutNumerical>;

export const Primary: Story = {
  args: {
    title: "콜아웃 레이블",
    labelText: "레이블",
  },
};
