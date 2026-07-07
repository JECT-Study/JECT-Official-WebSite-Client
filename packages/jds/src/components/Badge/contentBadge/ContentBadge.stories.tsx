import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentBadge } from "./ContentBadge";
import { CONTENT_BADGE_STYLE_OPTIONS, THEME_VARIANT_OPTIONS } from "./contentBadge.types";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";

const meta: Meta<typeof ContentBadge> = {
  title: "Components/ContentBadge",
  component: ContentBadge,
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
      options: CONTENT_BADGE_STYLE_OPTIONS,
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

type Story = StoryObj<typeof ContentBadge>;

export const Basic: Story = {
  argTypes: {
    hierarchy: {
      control: "radio",
      options: BASIC_HIERARCHY_OPTIONS,
    },
    withIconButton: {
      control: "boolean",
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <ContentBadge
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
      {...(args.withIconButton
        ? { withIconButton: true, onIconClick: () => undefined }
        : { withIconButton: false })}
    >
      {args.children}
    </ContentBadge>
  ),
};

export const Feedback: Story = {
  argTypes: {
    feedback: {
      control: "radio",
      options: FEEDBACK_VARIANT_OPTIONS,
    },
    withIconButton: {
      control: "boolean",
    },
  },
  args: {
    feedback: "positive",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <ContentBadge
      feedback={args.feedback}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
      {...(args.withIconButton
        ? { withIconButton: true, onIconClick: () => undefined }
        : { withIconButton: false })}
    >
      {args.children}
    </ContentBadge>
  ),
};

export const Theme: Story = {
  argTypes: {
    variant: {
      control: "select",
      options: THEME_VARIANT_OPTIONS,
    },
  },
  args: {
    variant: "red",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "레이블",
  },
  render: args => (
    <ContentBadge
      variant={args.variant}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </ContentBadge>
  ),
};
