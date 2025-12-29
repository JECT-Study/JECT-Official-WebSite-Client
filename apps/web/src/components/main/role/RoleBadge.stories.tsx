import type { Meta, StoryObj } from "@storybook/react-vite";

import RoleBadge from "./RoleBadge";

const meta: Meta<typeof RoleBadge> = {
  title: "Components/Role/RoleBadge",
  component: RoleBadge,
  argTypes: {
    variant: {
      control: "select",
      options: ["fe", "be", "do", "pm", "pd"],
      description: "Badge의 종류를 선택합니다.",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof RoleBadge>;

export const DefaultStory: Story = {
  name: "Default",
  args: {
    variant: "fe",
  },
};

export const RoleBadgeStory: Story = {
  name: "RoleBadge",
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <RoleBadge variant='fe' />
      </div>
      <div className='story-inner-container'>
        <RoleBadge variant='be' />
      </div>
      <div className='story-inner-container'>
        <RoleBadge variant='do' />
      </div>
      <div className='story-inner-container'>
        <RoleBadge variant='pm' />
      </div>
      <div className='story-inner-container'>
        <RoleBadge variant='pd' />
      </div>
    </div>
  ),
};
