import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumericBadge } from "./NumericBadge";
import { NUMERIC_BADGE_STYLE_OPTIONS } from "./numericBadge.types";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";

const meta: Meta<typeof NumericBadge> = {
  title: "Components/NumericBadge",
  component: NumericBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "radio",
      options: BADGE_SIZE_OPTIONS,
    },
    badgeStyle: {
      control: "radio",
      options: NUMERIC_BADGE_STYLE_OPTIONS,
    },
    isMuted: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumericBadge>;

export const Basic: Story = {
  argTypes: {
    hierarchy: {
      control: "radio",
      options: BASIC_HIERARCHY_OPTIONS,
    },
  },
  args: {
    hierarchy: "secondary",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <NumericBadge
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </NumericBadge>
  ),
};

export const Feedback: Story = {
  argTypes: {
    feedback: {
      control: "radio",
      options: FEEDBACK_VARIANT_OPTIONS,
    },
  },
  args: {
    feedback: "positive",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <NumericBadge
      feedback={args.feedback}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </NumericBadge>
  ),
};
