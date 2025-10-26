import type { Meta, StoryObj } from '@storybook/react';
import { FlexColumn } from '@storybook-utils/layout';
import { useState } from 'react';

import { TagField } from './index';
import type { Tag } from './tagField.types';

const meta = {
  title: 'Components/Input/TagField',
  component: TagField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['outlined', 'empty'],
      description: 'Input 필드의 시각적 스타일',
      table: {
        defaultValue: { summary: 'outlined' },
      },
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '레이아웃 방향',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    validation: {
      control: 'select',
      options: ['none', 'error', 'success'],
      description: '유효성 검증 상태',
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
      description: '레이블 옆에 표시할 아이콘 (IconName)',
    },
    helperText: {
      control: 'text',
      description: 'Helper 메시지',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
    maxTags: {
      control: 'number',
      description: '최대 태그 개수',
    },
    allowDuplicates: {
      control: 'boolean',
      description: '중복 태그 허용 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof TagField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'TypeScript' },
      { id: '3', label: 'Design System' },
    ]);

    return (
      <div style={{ width: '24rem' }}>
        <TagField
          label='관심 기술 스택'
          placeholder='태그를 입력하고 Enter를 누르세요'
          helperText='Enter로 추가, Backspace로 삭제'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**TagField (기본)**

태그를 입력하고 관리할 수 있는 필드입니다.

- Enter: 태그 추가  
- Backspace (입력값 비어있을 때): 마지막 태그 삭제  
- Badge 클릭: 해당 태그 삭제
        `,
      },
    },
  },
};

export const Empty: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([]);

    return (
      <div style={{ width: '24rem' }}>
        <TagField
          label='태그'
          placeholder='태그를 입력하세요'
          helperText='태그를 추가해보세요'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**빈 상태**\n\n태그가 없는 초기 상태입니다. 태그 컨테이너는 숨겨집니다.',
      },
    },
  },
};

export const WithMaxTags: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'TypeScript' },
    ]);

    return (
      <div style={{ width: '24rem' }}>
        <TagField
          label='기술 스택 (최대 5개)'
          placeholder='태그를 입력하세요'
          helperText={`${tags.length}/5 - 최대 5개까지 입력 가능`}
          tags={tags}
          onTagsChange={setTags}
          maxTags={5}
          validation={tags.length >= 5 ? 'error' : 'none'}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**최대 개수 제한**\n\n' +
          '`maxTags` prop으로 최대 태그 개수를 제한할 수 있습니다.\n' +
          '최대 개수에 도달하면 자동으로 추가가 차단됩니다.',
      },
    },
  },
};

export const WithDuplicates: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([{ id: '1', label: 'React' }]);
    const [tags2, setTags2] = useState<Tag[]>([{ id: '1', label: 'React' }]);

    return (
      <FlexColumn gap='24px'>
        <TagField
          label='중복 불가 (기본)'
          placeholder='React를 입력해보세요'
          helperText='동일한 태그를 추가할 수 없습니다'
          tags={tags1}
          onTagsChange={setTags1}
          allowDuplicates={false}
        />

        <TagField
          label='중복 허용'
          placeholder='React를 여러 번 입력해보세요'
          helperText='동일한 태그를 여러 번 추가할 수 있습니다'
          tags={tags2}
          onTagsChange={setTags2}
          allowDuplicates={true}
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**중복 허용 설정**\n\n' +
          '`allowDuplicates` prop으로 중복 태그 허용 여부를 제어할 수 있습니다.\n' +
          '- `false` (기본): 중복 태그 불가\n' +
          '- `true`: 중복 태그 허용',
      },
    },
  },
};

export const WithValidation: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([{ id: '1', label: 'React' }]);
    const [tags2, setTags2] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'Vue' },
      { id: '3', label: 'Angular' },
      { id: '4', label: 'Svelte' },
      { id: '5', label: 'Solid' },
      { id: '6', label: 'Qwik' },
    ]);
    const [tags3, setTags3] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'TypeScript' },
    ]);

    return (
      <FlexColumn gap='24px'>
        <TagField
          label='기술 스택 (Normal)'
          placeholder='태그를 입력하세요'
          helperText='최소 1개 이상 입력해주세요'
          validation='none'
          tags={tags1}
          onTagsChange={setTags1}
        />

        <TagField
          label='기술 스택 (Error)'
          placeholder='태그를 입력하세요'
          helperText='최대 5개까지만 입력 가능합니다'
          validation='error'
          tags={tags2}
          onTagsChange={setTags2}
        />

        <TagField
          label='기술 스택 (Success)'
          placeholder='태그를 입력하세요'
          helperText='올바르게 입력되었습니다'
          validation='success'
          tags={tags3}
          onTagsChange={setTags3}
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Validation 상태**\n\n' +
          '- `none`: 기본 상태\n' +
          '- `error`: 에러 상태 (빨간색 테두리 및 메시지)\n' +
          '- `success`: 성공 상태 (초록색 테두리 및 메시지)',
      },
    },
  },
};

export const States: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'TypeScript' },
    ]);

    const tags2 = [
      { id: '1', label: 'JavaScript' },
      { id: '2', label: 'Python' },
    ];

    const tags3 = [
      { id: '1', label: 'Java' },
      { id: '2', label: 'Kotlin' },
    ];

    return (
      <FlexColumn gap='32px'>
        <TagField
          label='Normal'
          placeholder='태그를 입력하세요'
          tags={tags1}
          onTagsChange={setTags1}
        />

        <TagField
          label='Disabled'
          placeholder='비활성화된 필드'
          helperText='이 필드는 비활성화되어 있습니다'
          interaction='disabled'
          tags={tags2}
          onTagsChange={() => {}}
        />

        <TagField
          label='Read Only'
          helperText='이 필드는 읽기 전용 상태입니다'
          interaction='readOnly'
          tags={tags3}
          onTagsChange={() => {}}
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**상태 예시**\n\n' +
          '- Normal: InteractionLayer 기반 hover/focus/active 인터랙션\n' +
          '- Disabled: 비활성화 상태 (회색, 태그 제거 불가)\n' +
          '- Read Only: 읽기 전용 상태 (태그 제거 불가)',
      },
    },
  },
};

export const WithLabelIcon: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: '1', label: 'Frontend' },
      { id: '2', label: 'Backend' },
    ]);

    return (
      <div style={{ width: '24rem' }}>
        <TagField
          label='개발 분야'
          labelIcon='information-line'
          placeholder='태그를 입력하세요'
          helperText='관심있는 개발 분야를 태그로 추가하세요'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**Label Icon 포함**\n\n레이블 옆에 아이콘을 추가할 수 있습니다.',
      },
    },
  },
};

export const ManyTags: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'TypeScript' },
      { id: '3', label: 'Next.js' },
      { id: '4', label: 'TailwindCSS' },
      { id: '5', label: 'Zustand' },
      { id: '6', label: 'React Query' },
      { id: '7', label: 'Storybook' },
      { id: '8', label: 'Vitest' },
      { id: '9', label: 'ESLint' },
      { id: '10', label: 'Prettier' },
    ]);

    return (
      <div style={{ width: '28rem' }}>
        <TagField
          label='기술 스택'
          placeholder='태그를 입력하세요'
          helperText='사용 가능한 기술들을 모두 추가해주세요'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**많은 태그**\n\n태그가 많아지면 자동으로 줄바꿈됩니다. flex-wrap을 사용하여 반응형으로 처리됩니다.',
      },
    },
  },
};

export const EmptyStyle: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'Vue' },
    ]);

    return (
      <div style={{ width: '24rem' }}>
        <TagField
          style='empty'
          label='기술 스택'
          placeholder='태그를 입력하세요'
          helperText='Empty 스타일 (테두리 없음)'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**Empty 스타일**\n\n테두리가 없는 스타일입니다.',
      },
    },
  },
};
