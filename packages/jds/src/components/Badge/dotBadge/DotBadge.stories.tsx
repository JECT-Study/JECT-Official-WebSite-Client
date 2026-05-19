import type { Meta, StoryObj } from "@storybook/react-vite";

import { DotBadge } from "./DotBadge";
import type { DotBadgeFeedbackProps } from "components";
import { BADGE_SIZE_OPTIONS, FEEDBACK_VARIANT_OPTIONS } from "./dotBadge.types";

const meta: Meta<typeof DotBadge.Feedback> = {
  title: "Components/DotBadge",
  component: DotBadge.Feedback,
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

export const Feedback: StoryObj<DotBadgeFeedbackProps> = {
  args: {
    variant: "positive",
    size: "md",
    isMuted: false,
  },
  render: args => (
    <DotBadge.Feedback variant={args.variant} size={args.size} isMuted={args.isMuted} />
  ),
};
