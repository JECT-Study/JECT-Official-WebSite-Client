import type { Meta, StoryObj } from '@storybook/react';
import { FlexRow, FlexColumn, Label } from '@storybook-utils/layout';
import { IconButton } from 'components';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
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
      description: '컴폰넌트의 크기',
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
} satisfies Meta<typeof IconButton>;

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
      <IconButton icon='check-line' size='2xs' aria-label='2XS Check' />
      <IconButton icon='check-line' size='xs' aria-label='XS Check' />
      <IconButton icon='check-line' size='sm' aria-label='SM Check' />
      <IconButton icon='check-line' size='md' aria-label='MD Check' />
      <IconButton icon='check-line' size='xl' aria-label='XL Check' />
      <IconButton icon='check-line' size='2xl' aria-label='2XL Check' />
      <IconButton icon='check-line' size='3xl' aria-label='3XL Check' />
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton icon='check-line' hierarchy='accent' aria-label='Accent Check' />
      <IconButton icon='check-line' hierarchy='primary' aria-label='Primary Check' />
      <IconButton icon='check-line' hierarchy='secondary' aria-label='Secondary Check' />
      <IconButton icon='check-line' hierarchy='tertiary' aria-label='Tertiary Check' />
    </FlexRow>
  ),
};

export const DifferentIcons: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton icon='add-line' aria-label='Add' />
      <IconButton icon='close-line' aria-label='Close' />
      <IconButton icon='check-line' aria-label='Check' />
      <IconButton icon='arrow-left-line' aria-label='Go Back' />
      <IconButton icon='arrow-right-line' aria-label='Go Forward' />
      <IconButton icon='search-line' aria-label='Search' />
    </FlexRow>
  ),
};

export const Disabled: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton icon='check-line' disabled hierarchy='accent' aria-label='Disabled Accent' />
      <IconButton icon='check-line' disabled hierarchy='primary' aria-label='Disabled Primary' />
      <IconButton
        icon='check-line'
        disabled
        hierarchy='secondary'
        aria-label='Disabled Secondary'
      />
      <IconButton icon='check-line' disabled hierarchy='tertiary' aria-label='Disabled Tertiary' />
    </FlexRow>
  ),
};

export const InteractionStates: Story = {
  args: {
    icon: 'check-line',
  },
  render: () => (
    <FlexRow>
      <IconButton icon='check-line' aria-label='Hover me' />
      <IconButton icon='check-line' aria-label='Click me (Active)' />
      <IconButton icon='check-line' aria-label='Tab to focus me' />
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
        <IconButton icon='check-line' size='sm' hierarchy='accent' aria-label='Accent SM' />
        <IconButton icon='check-line' size='md' hierarchy='accent' aria-label='Accent MD' />
        <IconButton icon='check-line' size='xl' hierarchy='accent' aria-label='Accent XL' />
      </FlexRow>
      <FlexRow>
        <Label>Primary:</Label>
        <IconButton icon='check-line' size='sm' hierarchy='primary' aria-label='Primary SM' />
        <IconButton icon='check-line' size='md' hierarchy='primary' aria-label='Primary MD' />
        <IconButton icon='check-line' size='xl' hierarchy='primary' aria-label='Primary XL' />
      </FlexRow>
      <FlexRow>
        <Label>Secondary:</Label>
        <IconButton icon='check-line' size='sm' hierarchy='secondary' aria-label='Secondary SM' />
        <IconButton icon='check-line' size='md' hierarchy='secondary' aria-label='Secondary MD' />
        <IconButton icon='check-line' size='xl' hierarchy='secondary' aria-label='Secondary XL' />
      </FlexRow>
      <FlexRow>
        <Label>Tertiary:</Label>
        <IconButton icon='check-line' size='sm' hierarchy='tertiary' aria-label='Tertiary SM' />
        <IconButton icon='check-line' size='md' hierarchy='tertiary' aria-label='Tertiary MD' />
        <IconButton icon='check-line' size='xl' hierarchy='tertiary' aria-label='Tertiary XL' />
      </FlexRow>
    </FlexColumn>
  ),
};
