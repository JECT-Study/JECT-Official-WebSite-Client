import type { Meta, StoryObj } from "@storybook/react-vite";
import type {
  ContentBadgeBasicProps,
  ContentFeedbackBadgeProps,
  ContentThemeBadgeProps,
} from "components";

import { ContentBadge } from "./ContentBadge";
import { CONTENT_BADGE_STYLE_OPTIONS, THEME_VARIANT_OPTIONS } from "./contentBadge.types";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";

const meta: Meta<typeof ContentBadge.Basic> = {
  title: "Components/ContentBadge",
  component: ContentBadge.Basic,
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

export const Basic: StoryObj<ContentBadgeBasicProps> = {
  argTypes: {
    hierarchy: {
      control: "radio",
      options: BASIC_HIERARCHY_OPTIONS,
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
      options: FEEDBACK_VARIANT_OPTIONS,
    },
    withIcon: {
      control: "boolean",
    },
  },
  args: {
    variant: "positive",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIcon: false,
    children: "레이블",
  },
  render: args => (
    <ContentBadge.Feedback
      variant={args.variant}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
      withIcon={args.withIcon}
    >
      {args.children}
    </ContentBadge.Feedback>
  ),
};

export const Theme: StoryObj<ContentThemeBadgeProps> = {
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
