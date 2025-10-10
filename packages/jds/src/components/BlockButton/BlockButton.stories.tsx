import type { Meta, StoryObj } from '@storybook/react';
import { FlexRow, FlexColumn, Label } from '@storybook-utils/layout';
import { BlockButton } from 'components';

const meta = {
  title: 'Components/BlockButton',
  component: BlockButton.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hierarchy: {
      control: 'select',
      options: ['accent', 'primary', 'secondary', 'tertiary'],
      description: '버튼의 시각적 위계',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '버튼의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outlined', 'empty'],
      description: '버튼의 스타일 변형',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    prefixIcon: {
      control: 'text',
      description: '버튼 텍스트 앞에 표시되는 아이콘 이름 (Icon 컴포넌트)',
    },
    suffixIcon: {
      control: 'text',
      description: '버튼 텍스트 뒤에 표시되는 아이콘 이름 (Icon 컴포넌트)',
    },
  },
} satisfies Meta<typeof BlockButton.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    hierarchy: 'primary',
    size: 'md',
    variant: 'solid',
  },
};

export const AllSizes: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <FlexRow>
      <BlockButton.Basic size='xs'>Extra Small</BlockButton.Basic>
      <BlockButton.Basic size='sm'>Small</BlockButton.Basic>
      <BlockButton.Basic size='md'>Medium</BlockButton.Basic>
      <BlockButton.Basic size='lg'>Large</BlockButton.Basic>
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic hierarchy='accent'>Accent</BlockButton.Basic>
      <BlockButton.Basic hierarchy='primary'>Primary</BlockButton.Basic>
      <BlockButton.Basic hierarchy='secondary'>Secondary</BlockButton.Basic>
      <BlockButton.Basic hierarchy='tertiary'>Tertiary</BlockButton.Basic>
    </FlexColumn>
  ),
};

export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic variant='solid'>Solid</BlockButton.Basic>
      <BlockButton.Basic variant='outlined'>Outlined</BlockButton.Basic>
      <BlockButton.Basic variant='empty'>Empty</BlockButton.Basic>
    </FlexColumn>
  ),
};

export const WithIcons: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic prefixIcon='arrow-left-line'>With Prefix Icon</BlockButton.Basic>
      <BlockButton.Basic suffixIcon='arrow-right-line'>With Suffix Icon</BlockButton.Basic>
      <BlockButton.Basic prefixIcon='arrow-left-line' suffixIcon='arrow-right-line'>
        With Both Icons
      </BlockButton.Basic>
    </FlexColumn>
  ),
};

export const InteractionStates: Story = {
  args: {
    children: 'Interact with me',
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic>Hover me</BlockButton.Basic>
      <BlockButton.Basic>Click me (Active)</BlockButton.Basic>
      <BlockButton.Basic>Tab to focus me</BlockButton.Basic>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'InteractionLayer 기반 인터랙션 시스템:\n\n' +
          '- **rest**: 기본 상태 (opacity: 0)\n' +
          '- **hover**: 마우스 오버 시 (opacity: 0.08, fluent motion 100ms)\n' +
          '- **active**: 클릭 중 (opacity: 0.12, transition 없음)\n' +
          '- **focus**: 키보드 포커스 시 (focus outline 표시, transition 없음)',
      },
    },
  },
};

export const ComprehensiveMatrix: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <FlexColumn gap='32px'>
      {(['solid', 'outlined', 'empty'] as const).map(variant => (
        <FlexColumn key={variant} gap='12px'>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </h3>
          <FlexRow gap='12px'>
            {(['accent', 'primary', 'secondary', 'tertiary'] as const).map(hierarchy => (
              <BlockButton.Basic key={hierarchy} variant={variant} hierarchy={hierarchy}>
                {hierarchy}
              </BlockButton.Basic>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant와 hierarchy 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

export const SizeWithVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <FlexColumn>
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <FlexColumn key={size} gap='12px'>
          <Label>{size.toUpperCase()}:</Label>
          <FlexRow gap='12px'>
            <BlockButton.Basic size={size} variant='solid'>
              Solid
            </BlockButton.Basic>
            <BlockButton.Basic size={size} variant='outlined'>
              Outlined
            </BlockButton.Basic>
            <BlockButton.Basic size={size} variant='empty'>
              Empty
            </BlockButton.Basic>
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};

export const FeedbackButtons: Story = {
  args: {
    children: 'Feedback Button',
  },
  render: () => (
    <FlexColumn>
      <Label>Positive:</Label>
      <FlexRow gap='12px'>
        <BlockButton.Feedback intent='positive' size='xs'>
          저장
        </BlockButton.Feedback>
        <BlockButton.Feedback intent='positive' size='sm'>
          저장
        </BlockButton.Feedback>
        <BlockButton.Feedback intent='positive' size='md'>
          저장
        </BlockButton.Feedback>
        <BlockButton.Feedback intent='positive' size='lg'>
          저장
        </BlockButton.Feedback>
      </FlexRow>
      <Label>Destructive:</Label>
      <FlexRow gap='12px'>
        <BlockButton.Feedback intent='destructive' size='xs'>
          삭제
        </BlockButton.Feedback>
        <BlockButton.Feedback intent='destructive' size='sm'>
          삭제
        </BlockButton.Feedback>
        <BlockButton.Feedback intent='destructive' size='md'>
          삭제
        </BlockButton.Feedback>
        <BlockButton.Feedback intent='destructive' size='lg'>
          삭제
        </BlockButton.Feedback>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '피드백 버튼은 사용자 행동에 대한 긍정적(positive) 또는 부정적(destructive) 피드백을 제공할 때 사용합니다.',
      },
    },
  },
};
