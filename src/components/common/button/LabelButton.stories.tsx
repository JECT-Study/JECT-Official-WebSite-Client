import type { Meta, StoryObj } from '@storybook/react';

import LabelButton from './LabelButton';

const meta: Meta<typeof LabelButton> = {
  title: 'Components/LabelButton',
  component: LabelButton,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: '버튼의 크기를 담당하는 요소입니다.',
    },
    hierarchy: {
      control: { type: 'select' },
      options: ['accent', 'primary', 'secondary', 'tertiary'],
      description: '버튼의 색상이 분기되는 위계 요소입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LabelButton>;

export const ButtonStory: Story = {
  name: 'Button',
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <div className='story-inner-row-container'>
          <LabelButton size='lg' hierarchy='accent'>
            레이블
          </LabelButton>
          <LabelButton size='lg' hierarchy='primary'>
            레이블
          </LabelButton>
          <LabelButton size='lg' hierarchy='secondary'>
            레이블
          </LabelButton>
          <LabelButton size='lg' hierarchy='tertiary'>
            레이블
          </LabelButton>
        </div>
      </div>
    </div>
  ),
};

export const IconButtonStory: Story = {
  name: 'Icon Button',
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <div className='story-inner-row-container'>
          <LabelButton
            size='lg'
            hierarchy='accent'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </LabelButton>
          <LabelButton
            size='lg'
            hierarchy='primary'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </LabelButton>
          <LabelButton
            size='lg'
            hierarchy='secondary'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </LabelButton>
          <LabelButton
            size='lg'
            hierarchy='tertiary'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </LabelButton>
        </div>
      </div>
    </div>
  ),
};
