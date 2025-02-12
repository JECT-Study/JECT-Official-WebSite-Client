import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

import cardSampleImage from '@/assets/CardSample.png';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '카드의 제목입니다.',
    },
    label: {
      control: { type: 'text' },
      description: '카드에 표시될 레이블입니다.',
    },
    imgUrl: {
      control: { type: 'text' },
      description: '카드에 표시될 이미지의 URL입니다.',
    },
    children: {
      control: { type: 'text' },
      description: '카드의 내용을 나타냅니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const CardStory: Story = {
  name: 'Card',
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <Card title='카드 타이틀' label='카드 레이블' imgUrl={cardSampleImage}>
          카드 내용
        </Card>
      </div>
    </div>
  ),
};
