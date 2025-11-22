import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '배너의 메인 타이틀',
    },
    subtitle: {
      control: 'text',
      description: '배너의 서브타이틀',
    },
    label: {
      control: 'text',
      description: 'Label 텍스트',
    },
    onClose: {
      action: 'closed',
      description: '닫기 버튼 클릭 핸들러',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '레이블',
    subtitle: '서브타이틀 텍스트',
    title: '메인 타이틀 텍스트',
    onClose: () => alert('배너가 닫혔습니다'),
  },
};

export const WithoutLabel: Story = {
  args: {
    subtitle: '서브타이틀만 있는 경우',
    title: '메인 타이틀',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Label이 없는 배너입니다.',
      },
    },
  },
};

export const WithoutSubtitle: Story = {
  args: {
    label: '레이블',
    title: '메인 타이틀만 있는 배너',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '서브타이틀이 없는 배너입니다.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    title: '타이틀만 있는 배너',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Label과 서브타이틀이 모두 없는 배너입니다.',
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  args: {
    title: '닫기 버튼이 없는 배너',
    subtitle: 'onClose prop을 제공하지 않으면 닫기 버튼이 표시되지 않습니다.',
    label: '레이블',
    onClose: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'onClose가 없으면 닫기 버튼이 표시되지 않습니다.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    label: '긴 레이블 텍스트',
    subtitle:
      '이것은 아주 긴 서브타이틀 텍스트입니다. 긴 텍스트가 어떻게 줄바꿈되는지 확인할 수 있습니다.',
    title:
      '이것은 아주 긴 메인 타이틀 텍스트입니다. 긴 텍스트가 어떻게 줄바꿈되는지 확인할 수 있습니다.',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 줄바꿈되는 것을 보여주는 예시입니다.',
      },
    },
  },
};
