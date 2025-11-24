import type { Meta, StoryObj } from "@storybook/react";

import ProgressIndex from "./ProgressIndex";

const meta: Meta<typeof ProgressIndex> = {
  title: "Components/Progress/ProgressIndex",
  component: ProgressIndex,
  argTypes: {
    children: { control: "number" },
    isActive: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressIndex>;

export const Default: Story = {
  args: {
    children: 1,
    isActive: true,
  },
};

export const Primary: Story = {
  name: "ProgressIndex",
  render: () => {
    return <ProgressIndex isActive={true}>{1}</ProgressIndex>;
  },
};
