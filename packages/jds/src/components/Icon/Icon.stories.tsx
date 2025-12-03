import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "absolute",
    size: "5xl",
  },
};

export const WithCustomColor: Story = {
  args: {
    name: "heart-3-fill",
    size: "3xl",
    color: "#ff0000",
  },
};

export const InheritColor: Story = {
  args: {
    name: "check-line",
    size: "2xl",
  },
  render: args => (
    <div style={{ color: "#00ff00" }}>
      <Icon {...args} />
    </div>
  ),
};
