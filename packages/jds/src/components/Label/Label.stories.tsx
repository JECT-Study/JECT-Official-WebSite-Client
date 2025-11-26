import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./Label";
import { theme } from "../../tokens/theme";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "레이블 텍스트",
      defaultValue: "Label",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    textAlign: "left",
    weight: "normal",
    children: "레이블",
  },
};

export const WithWideParentElement: Story = {
  args: {
    size: "lg",
    textAlign: "left",
    weight: "bold",
    children: "레이블",
  },
  render: args => (
    <div style={{ width: "500px", border: "1px solid red" }}>
      <Label size={args.size} textAlign={args.textAlign} weight={args.weight}>
        {args.children}
      </Label>
    </div>
  ),
};

export const WithColor: Story = {
  args: {
    size: "lg",
    textAlign: "left",
    weight: "bold",
    children: "레이블",
  },
  render: args => {
    return <Label {...args} color={theme.color.semantic.accent.neutral} />;
  },
};
