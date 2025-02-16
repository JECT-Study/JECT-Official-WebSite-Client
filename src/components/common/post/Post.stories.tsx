import type { Meta, StoryObj } from '@storybook/react';

import { Post } from './Post';

const meta: Meta<typeof Post> = {
  title: 'Components/Post',
  component: Post,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '포스트의 제목입니다.',
    },
    label: {
      control: { type: 'text' },
      description: '포스트에 표시될 라벨입니다.',
    },
    date: {
      control: { type: 'text' },
      description: '포스트 작성 날짜입니다.',
    },
    children: {
      control: { type: 'text' },
      description: '포스트의 내용을 나타냅니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Post>;

export const PostStory: Story = {
  name: 'Post',
  render: () => (
    <div className='story-container'>
      <div className='story-inner-container'>
        <Post title='포스트 제목' label='레이블' date='2025-02-12'>
          포스트 바디 텍스트
        </Post>
      </div>
    </div>
  ),
};
