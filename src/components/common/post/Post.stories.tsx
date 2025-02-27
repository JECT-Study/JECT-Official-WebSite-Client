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
    children: {
      control: { type: 'text' },
      description: '포스트의 내용을 나타냅니다.',
    },
  },
  args: {
    title: '포스트 제목',
    label: '레이블',
    children: '포스트 바디 텍스트',
  },
};

export default meta;

type Story = StoryObj<typeof Post>;

export const DefaultPostStory: Story = {
  name: 'Default Post',
  render: args => (
    <div className='story-container'>
      <div className='w-[60rem]'>
        <Post {...args} />
      </div>
      <div className='w-[60rem]'>
        <Post {...args} disabled={true} />
      </div>
    </div>
  ),
};

export const PostStory: Story = {
  name: 'Post',
  render: () => (
    <div className='story-container'>
      실제 사용되는 PostContainer를 반영합니다.
      <div className='w-[60rem]'>
        <Post title='포스트 제목' label='레이블'>
          포스트 바디 텍스트
        </Post>
      </div>
      <div className='w-[60rem]'>
        <Post title='포스트 제목' label='레이블' disabled={true}>
          포스트 바디 텍스트
        </Post>
      </div>
    </div>
  ),
};
