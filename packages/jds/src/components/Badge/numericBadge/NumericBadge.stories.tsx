import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumericBadge } from "./NumericBadge";
import type { NumericBadgeBasicProps, NumericBasicBadgeProps } from "components";
import { NUMERIC_BADGE_STYLE_OPTIONS } from "./numericBadge.types";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";

const meta: Meta<typeof NumericBadge.Basic> = {
  title: "Components/NumericBadge",
  component: NumericBadge.Basic,
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

export const Basic: StoryObj<NumericBadgeBasicProps> = {
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
    <NumericBadge.Basic
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </NumericBadge.Basic>
  ),
};

export const Feedback: StoryObj<NumericBasicBadgeProps> = {
  argTypes: {
    variant: {
      control: "radio",
      options: FEEDBACK_VARIANT_OPTIONS,
    },
  },
  args: {
    variant: "positive",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <NumericBadge.Feedback
      variant={args.variant}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </NumericBadge.Feedback>
  ),
};
