import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Role',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['fe', 'be', 'do', 'pm', 'pd'],
      description: 'Badge의 종류를 선택합니다.',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    variant: 'fe',
  },
};

export const BadgeStory: Story = {
  name: 'Badge',
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <Badge variant='fe' />
      </div>
      <div className='story-inner-container'>
        <Badge variant='be' />
      </div>
      <div className='story-inner-container'>
        <Badge variant='do' />
      </div>
      <div className='story-inner-container'>
        <Badge variant='pm' />
      </div>
      <div className='story-inner-container'>
        <Badge variant='pd' />
      </div>
    </div>
  ),
};
