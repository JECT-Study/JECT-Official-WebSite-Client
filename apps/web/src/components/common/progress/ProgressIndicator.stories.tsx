import type { Meta, StoryObj } from "@storybook/react-vite";

import ProgressIndicator from "./ProgressIndicator";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Components/Progress/ProgressIndicator",
  component: ProgressIndicator,
  argTypes: {
    totalStep: {
      control: "number",
      description: "단계의 총 개수를 적어줍니다.",
    },
    currentStep: {
      control: "number",
      description: "현재까지 active된 마지막 단계를 적어줍니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    totalStep: 3,
    currentStep: 1,
  },
};

export const Primary: Story = {
  name: "ProgressIndicator",
  render: () => {
    return <ProgressIndicator totalStep={4} currentStep={3}></ProgressIndicator>;
  },
};
