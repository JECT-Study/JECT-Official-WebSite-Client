import { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    title: {
      control: 'text',
      description: '아코디언 헤더에 들어갈 타이틀입니다.',
    },
    label: {
      control: 'text',
      description: '아코디언 레이블입니다.',
    },
    children: {
      description: 'ReactNode 타입의 아코디언 바디 내용입니다.',
    },
    caption: {
      description: 'ReactNode 타입의 아코디언 캡션 내용 입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: '아코디언 헤더 타이틀',
    label: '아코디언 레이블',
    children: '아코디언 바디 내용',
    caption: '아코디언 캡션 내용',
  },
};

export const AccordionStory: Story = {
  name: 'Accordion Story',
  render: () => {
    return (
      <div className='gap-xs flex flex-col'>
        <Accordion
          title='아코디언 헤더 타이틀1'
          label='아코디언 레이블'
          caption='아코디언 캡션 내용'
        >
          아코디언 바디 내용
        </Accordion>
        <Accordion
          title='아코디언 헤더 타이틀2'
          label='아코디언 레이블'
          caption='아코디언 캡션 내용'
        >
          아코디언 바디 내용
        </Accordion>
      </div>
    );
  },
};

export const AccordionListStory: Story = {
  name: 'Accordion List Story',
  render: () => {
    return (
      <Accordion title='아코디언 헤더 타이틀' label='아코디언 레이블' caption='아코디언 캡션 내용'>
        아코디언 바디 내용으로 리스트가 있을 때 `list-disc-ject`, `list-inside list-decimal` 클래스
        스타일을 사용합니다
        <ul className='list-disc-ject'>
          <li>리스트1</li>
          <li>리스트1</li>
          <li>리스트1</li>
        </ul>
        <ul className='list-inside list-decimal'>
          <li>리스트1</li>
          <li>리스트1</li>
          <li>리스트1</li>
        </ul>
      </Accordion>
    );
  },
};
