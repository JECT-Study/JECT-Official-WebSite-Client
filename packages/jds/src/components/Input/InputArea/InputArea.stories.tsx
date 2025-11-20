import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InputArea } from './InputArea';

const meta = {
  title: 'Components/Input/InputArea',
  component: InputArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['outlined', 'empty'],
      description: 'InputArea의 시각적 스타일',
      table: {
        defaultValue: { summary: 'outlined' },
      },
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '레이블과 필드의 레이아웃 관계',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    validation: {
      control: 'select',
      options: ['none', 'error'],
      description: '입력 값의 유효성 검증 결과',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    interaction: {
      control: 'select',
      options: ['enabled', 'disabled', 'readOnly'],
      description: '인터랙션 상태 (활성화, 비활성화, 읽기 전용)',
      table: {
        defaultValue: { summary: 'enabled' },
      },
    },
    label: {
      control: 'text',
      description: '레이블 텍스트',
    },
    labelIcon: {
      control: 'text',
      description: '레이블 옆 정보 아이콘',
    },
    labelVisible: {
      control: 'boolean',
      description: '레이블 가시성',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper 메시지',
    },
    maxLength: {
      control: 'number',
      description: '최대 글자수 제한 (카운트 자동 표시)',
    },
    height: {
      control: 'text',
      description: 'Wrapper 고정 높이 (설정 시 내부 스크롤, resize 불가)',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Wrapper 최소 높이 (자동 확장 가능, resize 가능, height 있으면 무시됨)',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '112' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof InputArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '피드백',
    helperText: '자유롭게 피드백을 작성해주세요',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='여러 줄의 텍스트를 입력하세요'
        />
      </div>
    );
  },
};

export const FixedHeight: Story = {
  args: {
    label: '고정 높이',
    height: 200,
    helperText: '높이가 200px로 고정되어 있습니다. 내용 초과 시 스크롤됩니다.',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='많은 텍스트를 입력해보세요. 스크롤이 생깁니다.'
        />
      </div>
    );
  },
};

export const DynamicHeight: Story = {
  args: {
    label: '동적 높이 (Resizable)',
    minHeight: 150,
    helperText: '최소 150px이며, 내용 입력 또는 우측 하단 핸들로 크기를 조절할 수 있습니다',
    maxLength: 1000,
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='텍스트를 입력하거나 우측 하단을 드래그해보세요!'
        />
      </div>
    );
  },
};

export const CSSHeightValue: Story = {
  args: {
    label: 'CSS 높이',
    minHeight: '10rem',
    helperText: 'minHeight를 10rem으로 설정했습니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='CSS 값으로 높이를 설정할 수 있습니다'
        />
      </div>
    );
  },
};

export const WithCount: Story = {
  args: {
    label: '상세 설명',
    helperText: '제품에 대한 상세 설명을 작성해주세요',
    maxLength: 500,
    minHeight: 180,
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='최대 500자까지 입력 가능합니다'
        />
      </div>
    );
  },
};

export const Error: Story = {
  args: {
    label: '코멘트',
    validation: 'error',
    helperText: '10자 이상 입력해주세요',
    maxLength: 100,
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('짧은 글');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='코멘트를 입력하세요'
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    interaction: 'disabled',
    helperText: '현재 입력이 비활성화되어 있습니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('비활성화된 상태입니다');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='입력할 수 없습니다'
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    label: '읽기 전용',
    interaction: 'readOnly',
    helperText: '읽기 전용 모드입니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('이 텍스트는 읽기 전용입니다. 수정할 수 없습니다.');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='읽기 전용'
        />
      </div>
    );
  },
};

export const EmptyStyle: Story = {
  args: {
    label: 'Empty 스타일',
    style: 'empty',
    helperText: '테두리가 없는 깔끔한 스타일',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='테두리가 없는 스타일입니다'
        />
      </div>
    );
  },
};

export const HorizontalLayout: Story = {
  args: {
    label: '가로 레이아웃',
    layout: 'horizontal',
    helperText: '레이블이 왼쪽에 위치합니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='가로 레이아웃'
        />
      </div>
    );
  },
};

export const WithLabelIcon: Story = {
  args: {
    label: '추가 정보',
    labelIcon: 'information-line',
    helperText: '아이콘을 호버하면 추가 정보를 볼 수 있습니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='정보 아이콘이 있는 InputArea'
        />
      </div>
    );
  },
};

export const HelperOnly: Story = {
  args: {
    label: 'Helper만',
    helperText: 'Helper 텍스트만 표시됩니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Helper만 표시'
        />
      </div>
    );
  },
};

export const CountOnly: Story = {
  args: {
    label: 'Count만',
    maxLength: 100,
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Count만 표시'
        />
      </div>
    );
  },
};

export const HiddenLabel: Story = {
  args: {
    label: '숨겨진 레이블',
    labelVisible: false,
    helperText: '레이블이 숨겨진 상태입니다',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '560px' }}>
        <InputArea
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='레이블이 숨겨진 상태'
        />
      </div>
    );
  },
};
