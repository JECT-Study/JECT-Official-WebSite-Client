import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      description: '아코디언의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    isExpanded: {
      control: 'boolean',
      description: '아코디언이 확장되었는지 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isStretched: {
      control: 'boolean',
      description: '컴포넌트 너비를 시각적 패딩 없이 늘려서 있는지 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    withPrefixIcon: {
      control: 'boolean',
      description: '내부에 접두 아이콘을 표현할지 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    prefixIcon: {
      control: 'text',
      description: '접두 아이콘 이름 (Icon 컴포넌트)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    labelText: {
      control: 'text',
      description: '제목 레이블 텍스트',
    },
    bodyText: {
      control: 'text',
      description: '본문 내용 텍스트',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
    size: 'md',
    isExpanded: false,
    isStretched: false,
    disabled: false,
    withPrefixIcon: false,
  },
};

export const WithIcon: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
    size: 'md',
    withPrefixIcon: true,
    prefixIcon: 'information-line',
  },
};

export const Expanded: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
    size: 'md',
    isExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
    size: 'md',
    disabled: true,
  },
};

export const Stretched: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
    size: 'md',
    isStretched: true,
  },
  decorators: [
    Story => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <Accordion
        labelText='Large Size'
        bodyText='아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.'
        size='lg'
        isStretched
      />
      <Accordion
        labelText='Medium Size'
        bodyText='아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.'
        size='md'
        isStretched
      />
      <Accordion
        labelText='Small Size'
        bodyText='아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.'
        size='sm'
        isStretched
      />
    </div>
  ),
};

const ControlledExampleComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '접기' : '펼치기'}</button>
      <Accordion
        labelText='제어되는 아코디언'
        bodyText='이 아코디언은 외부 버튼으로 제어됩니다.'
        isExpanded={isExpanded}
        onToggle={setIsExpanded}
      />
    </div>
  );
};

export const ControlledExample: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
  },
  render: () => <ControlledExampleComponent />,
};

export const FAQExample: Story = {
  args: {
    labelText: '타이틀',
    bodyText: '아코디언 콘텐츠 내용을 타이핑해 대한 상세 내용 및 설명이 포함될 수 있습니다.',
  },
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '600px' }}>
        <Accordion
          labelText='JECT는 어떤 동아리인가요?'
          bodyText='JECT는 경상국립대학교의 프로젝트 중심 IT 동아리입니다. 다양한 프로젝트를 통해 실무 경험을 쌓고, 함께 성장하는 것을 목표로 합니다.'
          isStretched
        />
        <Accordion
          labelText='어떻게 지원할 수 있나요?'
          bodyText='매 학기 초 모집 기간에 지원서를 제출하실 수 있습니다. 자세한 사항은 공식 웹사이트를 참고해주세요.'
          isStretched
        />
        <Accordion
          labelText='어떤 활동을 하나요?'
          bodyText='프로젝트 개발, 스터디, 세미나, 네트워킹 등 다양한 활동을 진행합니다.'
          isStretched
        />
      </div>
    );
  },
};
