import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";

import { DotBadge } from "./DotBadge";
import { BADGE_SIZE_OPTIONS, FEEDBACK_VARIANT_OPTIONS } from "../badge.types";

const meta: Meta<typeof DotBadge> = {
  title: "Components/Badge/Dot",
  component: DotBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    feedback: {
      control: "radio",
      options: FEEDBACK_VARIANT_OPTIONS,
    },
    size: {
      control: "radio",
      options: BADGE_SIZE_OPTIONS,
    },
    isMuted: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DotBadge>;

export const Default: Story = {
  args: {
    feedback: "positive",
    size: "md",
    isMuted: false,
  },
};

export const DotBadgeSizes: Story = {
  args: {
    feedback: "positive",
    isMuted: false,
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  render: args => (
    <FlexRow>
      {BADGE_SIZE_OPTIONS.map(size => (
        <DotBadge key={size} feedback={args.feedback} size={size} isMuted={args.isMuted} />
      ))}
    </FlexRow>
  ),
};

export const DotBadgeFeedback: Story = {
  args: {
    size: "md",
    isMuted: false,
  },
  argTypes: {
    feedback: {
      control: false,
    },
  },
  render: args => (
    <FlexRow>
      {FEEDBACK_VARIANT_OPTIONS.map(feedback => (
        <DotBadge key={feedback} feedback={feedback} size={args.size} isMuted={args.isMuted} />
      ))}
    </FlexRow>
  ),
};

export const DotBadgeMuted: Story = {
  args: {
    size: "md",
    isMuted: true,
  },
  argTypes: {
    feedback: {
      control: false,
    },
  },
  render: args => (
    <FlexRow>
      {FEEDBACK_VARIANT_OPTIONS.map(feedback => (
        <DotBadge key={feedback} feedback={feedback} size={args.size} isMuted={args.isMuted} />
      ))}
    </FlexRow>
  ),
};
