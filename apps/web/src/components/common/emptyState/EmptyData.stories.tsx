import type { Meta, StoryObj } from "@storybook/react-vite";

import EmptyData from "./EmptyData";

const meta: Meta<typeof EmptyData> = {
  title: "Components/EmptyData",
  component: EmptyData,
};

export default meta;

type Story = StoryObj<typeof EmptyData>;

export const EmptyDataStory: Story = {
  name: "EmptyData Story",
  render: () => <EmptyData />,
};
