import type { Meta, StoryObj } from '@storybook/react';

import LabelButton from './LabelButton';

import Icon from '@/components/common/icon/Icon';

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
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부입니다.',
    },
  },
  args: {
    size: 'lg',
    hierarchy: 'accent',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof LabelButton>;

export const DefaultStory: Story = {
  name: 'Default LabelButton',
  render: args => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <div className='story-inner-row-container'>
          <LabelButton {...args}>레이블</LabelButton>
        </div>
      </div>
    </div>
  ),
};

export const ButtonStory: Story = {
  name: 'LabelButton',
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
          <LabelButton size='lg' hierarchy='accent' disabled={true}>
            레이블
          </LabelButton>
        </div>
      </div>
    </div>
  ),
};

export const IconButtonStory: Story = {
  name: 'Icon LabelButton',
  render: args => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <div className='story-inner-row-container'>
          <LabelButton
            {...args}
            leftIcon={<Icon name='check' size='md' fillColor='fill-accent-hero-dark' />}
            rightIcon={<Icon name='check' size='md' fillColor='fill-accent-hero-dark' />}
          >
            레이블
          </LabelButton>
          <LabelButton
            {...args}
            hierarchy='primary'
            leftIcon={<Icon name='check' size='md' fillColor='fill-object-hero-dark' />}
            rightIcon={<Icon name='check' size='md' fillColor='fill-object-hero-dark' />}
          >
            레이블
          </LabelButton>
          <LabelButton
            {...args}
            hierarchy='secondary'
            leftIcon={<Icon name='check' size='md' fillColor='fill-object-neutral-dark' />}
            rightIcon={<Icon name='check' size='md' fillColor='fill-object-neutral-dark' />}
          >
            레이블
          </LabelButton>
          <LabelButton
            {...args}
            hierarchy='tertiary'
            leftIcon={<Icon name='check' size='md' fillColor='fill-object-alternative-dark' />}
            rightIcon={<Icon name='check' size='md' fillColor='fill-object-alternative-dark' />}
          >
            레이블
          </LabelButton>
          <LabelButton
            {...args}
            leftIcon={<Icon name='check' size='md' fillColor='fill-accent-trans-hero-dark' />}
            rightIcon={<Icon name='check' size='md' fillColor='fill-accent-trans-hero-dark' />}
            disabled={true}
          >
            레이블
          </LabelButton>
        </div>
      </div>
    </div>
  ),
};
