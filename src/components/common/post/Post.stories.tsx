import type { Meta, StoryObj } from '@storybook/react';

import { Post } from './Post';

const meta: Meta<typeof Post> = {
  title: 'Components/Post',
  component: Post,
  parameters: {
    docs: {
      description: {
        component:
          'Post 컴포넌트는 제목, 라벨 및 본문 내용을 표시하며, 외부 링크 기본값(새 탭 열기 및 보안 속성)을 제공합니다. 내부와 외부 링크를 구분하여 사용할 수 있도록 설계되었습니다. (내부 링크의 경우 필요하면 target 속성 등을 오버라이딩)',
      },
    },
  },
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
