import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentBadge } from "./ContentBadge";
import type {
  ContentBadgeBasicProps,
  ContentFeedbackBadgeProps,
  ContentThemeBadgeProps,
} from "./ContentBadge";

const meta: Meta<typeof ContentBadge.Basic> = {
  title: "Components/ContentBadge",
  component: ContentBadge.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md", "sm", "xs"],
    },
    badgeStyle: {
      control: "radio",
      options: ["solid", "alpha", "outlined"],
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

export const Basic: StoryObj<ContentBadgeBasicProps> = {
  argTypes: {
    hierarchy: {
      control: "radio",
      options: ["accent", "primary", "secondary", "tertiary"],
    },
    withIcon: {
      control: "boolean",
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIcon: false,
    children: "레이블",
  },
  render: args => (
    <ContentBadge.Basic
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
      withIcon={args.withIcon}
    >
      {args.children}
    </ContentBadge.Basic>
  ),
};

export const Feedback: StoryObj<ContentFeedbackBadgeProps> = {
  argTypes: {
    variant: {
      control: "radio",
      options: ["positive", "destructive", "notifying"],
    },
  },
  args: {
    variant: "positive",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "레이블",
  },
  render: args => (
    <ContentBadge.Feedback
      variant={args.variant}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </ContentBadge.Feedback>
  ),
};

export const Theme: StoryObj<ContentThemeBadgeProps> = {
  argTypes: {
    variant: {
      control: "select",
      options: [
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
      ],
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
    <ContentBadge.Theme
      variant={args.variant}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </ContentBadge.Theme>
  ),
};
