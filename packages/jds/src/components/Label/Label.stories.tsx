import styled from "@emotion/styled";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./Label";

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

export const WithParentElement: Story = {
  name: "With Parent Element",
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

const AccentLabel = styled(Label)(({ theme }) => ({
  color: theme.color.semantic.accent.neutral,
}));

export const WithAccentColor: Story = {
  name: "With Accent Color (styled pattern)",
  args: {
    size: "lg",
    textAlign: "left",
    weight: "bold",
    children: "강조 레이블",
  },
  render: args => <AccentLabel {...args} />,
};

interface VariantLabelProps {
  variant?: "default" | "accent" | "muted" | "success" | "error";
}

const VariantLabel = styled(Label)<VariantLabelProps>(({ theme, variant = "default" }) => {
  const colorMap = {
    default: theme.color.semantic.object.bold,
    accent: theme.color.semantic.accent.neutral,
    muted: theme.color.semantic.object.subtle,
    success: theme.color.semantic.feedback.positive.normal,
    error: theme.color.semantic.feedback.destructive.normal,
  };

  return {
    color: colorMap[variant],
  };
});

export const WithVariants: Story = {
  name: "With Color Variants (styled pattern)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <VariantLabel variant='default' size='md' weight='normal'>
        기본 레이블
      </VariantLabel>
      <VariantLabel variant='accent' size='md' weight='bold'>
        강조 레이블
      </VariantLabel>
      <VariantLabel variant='muted' size='md' weight='normal'>
        흐린 레이블
      </VariantLabel>
      <VariantLabel variant='success' size='md' weight='normal'>
        성공 레이블
      </VariantLabel>
      <VariantLabel variant='error' size='md' weight='normal'>
        에러 레이블
      </VariantLabel>
    </div>
  ),
};
