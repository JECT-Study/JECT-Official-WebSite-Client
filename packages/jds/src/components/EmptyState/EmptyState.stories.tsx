import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { FlexColumn } from '@storybook-utils/layout';

const SAMPLE_BUTTON = '레이블';
const SAMPLE_LABEL = '멀티 스테이트 레이블';
const SAMPLE_BODY =
  '해당 엠티 스테이트에 대해 설명하거나 제안하는 콘텐츠 내용을 최대 세 줄 까지 입력할 수 있습니다.';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['empty', 'outlined', 'alpha'],
      description: '엠티 스테이트 외관 변형',
      table: {
        defaultValue: { summary: 'empty' },
      },
    },
    labelText: {
      control: 'text',
      description: '엠티 스테이트를 축약적으로 설명하는 레이블',
    },
    bodyText: {
      control: 'text',
      description: '엠티 스테이트를 자세하게 설명하는 레이블',
    },
    primaryLabel: {
      control: 'text',
      description: '첫 번째 버튼 레이블',
    },
    secondaryLabel: {
      control: 'text',
      description: '두 번째 버튼 레이블',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '엠티 스테이트의 세로-가로 방향에 따른 외관 변경',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    icon: {
      control: 'text',
      description: '엠티 스테이트에 표시되는 아이콘 이름 (Icon 컴포넌트)',
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    variant: 'empty',
    labelText: SAMPLE_LABEL,
    bodyText: SAMPLE_BODY,
    primaryLabel: SAMPLE_BUTTON,
    secondaryLabel: SAMPLE_BUTTON,
    layout: 'vertical',
    icon: 'vector',
  },
};

export const AllVariants: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState labelText='Empty' bodyText={SAMPLE_BODY} />
      <EmptyState variant='outlined' labelText='Outlined' bodyText={SAMPLE_BODY} />
      <EmptyState variant='alpha' labelText='Alpha' bodyText={SAMPLE_BODY} />
    </FlexColumn>
  ),
};

const handleButtonClick = () => {
  console.log('클릭');
};

export const AllLayouts: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState labelText={SAMPLE_LABEL} bodyText={SAMPLE_BODY} />
      <EmptyState layout='horizontal' labelText={SAMPLE_LABEL} bodyText={SAMPLE_BODY} />
    </FlexColumn>
  ),
};

export const AllActions: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState
        primaryLabel={SAMPLE_BUTTON}
        labelText={SAMPLE_LABEL}
        bodyText={SAMPLE_BODY}
        primaryButtonProps={{ onClick: handleButtonClick }}
      />
      <EmptyState
        primaryLabel={SAMPLE_BUTTON}
        secondaryLabel={SAMPLE_BUTTON}
        labelText={SAMPLE_LABEL}
        bodyText={SAMPLE_BODY}
        primaryButtonProps={{ onClick: handleButtonClick }}
        secondaryButtonProps={{ onClick: handleButtonClick }}
      />
      <EmptyState
        primaryLabel={SAMPLE_BUTTON}
        layout='horizontal'
        labelText={SAMPLE_LABEL}
        bodyText={SAMPLE_BODY}
        primaryButtonProps={{ onClick: handleButtonClick }}
      />
      <EmptyState
        primaryLabel={SAMPLE_BUTTON}
        secondaryLabel={SAMPLE_BUTTON}
        layout='horizontal'
        labelText={SAMPLE_LABEL}
        bodyText={SAMPLE_BODY}
        primaryButtonProps={{ onClick: handleButtonClick }}
        secondaryButtonProps={{ onClick: handleButtonClick }}
      />
    </FlexColumn>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState
        icon='vector'
        primaryLabel={SAMPLE_BUTTON}
        secondaryLabel={SAMPLE_BUTTON}
        labelText={SAMPLE_LABEL}
        bodyText={SAMPLE_BODY}
        primaryButtonProps={{ onClick: handleButtonClick }}
        secondaryButtonProps={{ onClick: handleButtonClick }}
      />
      <EmptyState
        icon='vector'
        primaryLabel={SAMPLE_BUTTON}
        secondaryLabel={SAMPLE_BUTTON}
        layout='horizontal'
        labelText={SAMPLE_LABEL}
        bodyText={SAMPLE_BODY}
        primaryButtonProps={{ onClick: handleButtonClick }}
        secondaryButtonProps={{ onClick: handleButtonClick }}
      />
    </FlexColumn>
  ),
};
