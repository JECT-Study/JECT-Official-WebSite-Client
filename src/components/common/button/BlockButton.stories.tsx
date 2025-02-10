import type { Meta, StoryObj } from '@storybook/react';

import BlockButton from './BlockButton';

const meta: Meta<typeof BlockButton> = {
  title: 'Components/BlockButton',
  component: BlockButton,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: '버튼의 크기를 담당하는 요소입니다.',
    },
    style: {
      control: { type: 'select' },
      options: ['solid', 'outlined'],
      description: 'BlockButton에서 분기가 되는 테두리가 있는 버튼, 꽉 찬 버튼입니다.',
    },
    hierarchy: {
      control: { type: 'select' },
      options: ['accent', 'primary', 'secondary', 'tertiary'],
      description: '버튼의 색상이 분기되는 위계 요소입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BlockButton>;

export const ButtonStory: Story = {
  name: 'Button',
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <div className='story-inner-row-container'>
          <BlockButton size='lg' style='solid' hierarchy='accent'>
            레이블
          </BlockButton>
          <BlockButton size='lg' style='solid' hierarchy='primary'>
            레이블
          </BlockButton>
          <BlockButton size='lg' style='solid' hierarchy='secondary'>
            레이블
          </BlockButton>
          <BlockButton size='lg' style='solid' hierarchy='tertiary'>
            레이블
          </BlockButton>
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
          <BlockButton
            size='lg'
            style='solid'
            hierarchy='accent'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </BlockButton>
          <BlockButton
            size='lg'
            style='solid'
            hierarchy='primary'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </BlockButton>
          <BlockButton
            size='lg'
            style='solid'
            hierarchy='secondary'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </BlockButton>
          <BlockButton
            size='lg'
            style='solid'
            hierarchy='tertiary'
            leftIcon={<span>→</span>}
            rightIcon={<span>→</span>}
          >
            레이블
          </BlockButton>
        </div>
      </div>
    </div>
  ),
};
