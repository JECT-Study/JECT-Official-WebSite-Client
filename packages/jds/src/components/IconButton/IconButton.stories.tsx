import type { Meta, StoryObj } from '@storybook/react';
import { FlexRow, FlexColumn, Label } from '@storybook-utils/layout';
import { IconButton } from 'components';

const meta = {
  title: 'Components/IconButton',
  component: IconButton.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'text',
      description: '표시할 아이콘 이름입니다. Icon 컴포넌트에서 사용하는 값입니다.',
    },
    hierarchy: {
      control: 'select',
      options: ['accent', 'primary', 'secondary', 'tertiary'],
      description: '버튼의 시각적 맥락적 위계 구분',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: '컴포넌트의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화되었는지 여부',
    },
    'aria-label': {
      control: 'text',
      description: '접근성을 위한 레이블이며 필요 시 사용하는 값입니다.',
    },
  },
} satisfies Meta<typeof IconButton.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'check-line',
    hierarchy: 'primary',
    size: 'md',
    'aria-label': '체크 버튼',
  },
};

export const AllSizes: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton.Basic icon='check-line' size='2xs' aria-label='2XS Check' />
      <IconButton.Basic icon='check-line' size='xs' aria-label='XS Check' />
      <IconButton.Basic icon='check-line' size='sm' aria-label='SM Check' />
      <IconButton.Basic icon='check-line' size='md' aria-label='MD Check' />
      <IconButton.Basic icon='check-line' size='xl' aria-label='XL Check' />
      <IconButton.Basic icon='check-line' size='2xl' aria-label='2XL Check' />
      <IconButton.Basic icon='check-line' size='3xl' aria-label='3XL Check' />
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton.Basic icon='check-line' hierarchy='accent' aria-label='Accent Check' />
      <IconButton.Basic icon='check-line' hierarchy='primary' aria-label='Primary Check' />
      <IconButton.Basic icon='check-line' hierarchy='secondary' aria-label='Secondary Check' />
      <IconButton.Basic icon='check-line' hierarchy='tertiary' aria-label='Tertiary Check' />
    </FlexRow>
  ),
};

export const DifferentIcons: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton.Basic icon='add-line' aria-label='Add' />
      <IconButton.Basic icon='close-line' aria-label='Close' />
      <IconButton.Basic icon='check-line' aria-label='Check' />
      <IconButton.Basic icon='arrow-left-line' aria-label='Go Back' />
      <IconButton.Basic icon='arrow-right-line' aria-label='Go Forward' />
      <IconButton.Basic icon='search-line' aria-label='Search' />
    </FlexRow>
  ),
};

export const InteractionStates: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton.Basic icon='check-line' aria-label='Hover me' />
      <IconButton.Basic icon='check-line' aria-label='Click me (Active)' />
      <IconButton.Basic icon='check-line' aria-label='Tab to focus me' />
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: 'rest, hover, active, focus 상태를 직접 테스트해보세요.',
      },
    },
  },
};

export const HierarchyWithSizes: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Accent:</Label>
        <IconButton.Basic icon='check-line' size='sm' hierarchy='accent' aria-label='Accent SM' />
        <IconButton.Basic icon='check-line' size='md' hierarchy='accent' aria-label='Accent MD' />
        <IconButton.Basic icon='check-line' size='xl' hierarchy='accent' aria-label='Accent XL' />
      </FlexRow>
      <FlexRow>
        <Label>Primary:</Label>
        <IconButton.Basic icon='check-line' size='sm' hierarchy='primary' aria-label='Primary SM' />
        <IconButton.Basic icon='check-line' size='md' hierarchy='primary' aria-label='Primary MD' />
        <IconButton.Basic icon='check-line' size='xl' hierarchy='primary' aria-label='Primary XL' />
      </FlexRow>
      <FlexRow>
        <Label>Secondary:</Label>
        <IconButton.Basic
          icon='check-line'
          size='sm'
          hierarchy='secondary'
          aria-label='Secondary SM'
        />
        <IconButton.Basic
          icon='check-line'
          size='md'
          hierarchy='secondary'
          aria-label='Secondary MD'
        />
        <IconButton.Basic
          icon='check-line'
          size='xl'
          hierarchy='secondary'
          aria-label='Secondary XL'
        />
      </FlexRow>
      <FlexRow>
        <Label>Tertiary:</Label>
        <IconButton.Basic
          icon='check-line'
          size='sm'
          hierarchy='tertiary'
          aria-label='Tertiary SM'
        />
        <IconButton.Basic
          icon='check-line'
          size='md'
          hierarchy='tertiary'
          aria-label='Tertiary MD'
        />
        <IconButton.Basic
          icon='check-line'
          size='xl'
          hierarchy='tertiary'
          aria-label='Tertiary XL'
        />
      </FlexRow>
    </FlexColumn>
  ),
};

export const FeedbackButtons: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Positive:</Label>
        <IconButton.Feedback
          icon='check-line'
          intent='positive'
          size='sm'
          aria-label='Positive SM'
        />
        <IconButton.Feedback
          icon='check-line'
          intent='positive'
          size='md'
          aria-label='Positive MD'
        />
        <IconButton.Feedback
          icon='check-line'
          intent='positive'
          size='xl'
          aria-label='Positive XL'
        />
      </FlexRow>
      <FlexRow>
        <Label>Destructive:</Label>
        <IconButton.Feedback
          icon='close-line'
          intent='destructive'
          size='sm'
          aria-label='Destructive SM'
        />
        <IconButton.Feedback
          icon='close-line'
          intent='destructive'
          size='md'
          aria-label='Destructive MD'
        />
        <IconButton.Feedback
          icon='close-line'
          intent='destructive'
          size='xl'
          aria-label='Destructive XL'
        />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '피드백 아이콘 버튼은 사용자 행동에 대한 긍정적(positive) 또는 부정적(destructive) 피드백을 제공할 때 사용합니다.',
      },
    },
  },
};
