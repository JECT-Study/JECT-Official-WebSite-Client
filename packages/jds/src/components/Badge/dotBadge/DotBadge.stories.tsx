import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DotBadgeProps } from "components";

import { DotBadge } from "./DotBadge";
import { BADGE_SIZE_OPTIONS, FEEDBACK_VARIANT_OPTIONS } from "../badge.types";

const meta: Meta<typeof DotBadge> = {
  title: "Components/DotBadge",
  component: DotBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
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

export const Feedback: StoryObj<DotBadgeProps> = {
  args: {
    variant: "positive",
    size: "md",
    isMuted: false,
  },
  render: args => <DotBadge variant={args.variant} size={args.size} isMuted={args.isMuted} />,
};
