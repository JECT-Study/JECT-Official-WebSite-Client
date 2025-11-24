import type { Meta, StoryObj } from "@storybook/react-vite";

import AnimatedSection from "./AnimatedSection";

const meta: Meta<typeof AnimatedSection> = {
  title: "Components/AnimatedSection",
  component: AnimatedSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedSection>;

export const Default: Story = {
  args: {},
};

export const AnimatedStory: Story = {
  name: "AnimatedSection",
  render: () => (
    <div className="story-container h-[60.3125rem] w-[90rem]">
      <AnimatedSection />
    </div>
  ),
};
