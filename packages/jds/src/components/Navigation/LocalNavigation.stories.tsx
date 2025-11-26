import type { Meta, StoryObj } from '@storybook/react';

import { LocalNavigation } from './LocalNavigation';
import { IconButton } from '../Button/IconButton';

import { useMediaQueryFlags } from '@/hooks';

const customViewports = {
  desktop: {
    name: 'Desktop (1200px)',
    styles: {
      width: '1200px',
      height: '800px',
    },
  },
  tablet: {
    name: 'Tablet (768px)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  mobile: {
    name: 'Mobile (320px)',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
};

const meta = {
  title: 'Components/LocalNavigation',
  component: LocalNavigation,
  parameters: {
    viewport: {
      layout: 'centered',
      viewports: customViewports,
    },
  },
  argTypes: {
    isStretched: {
      control: 'boolean',
      description: '시각적 패딩 값의 여부',
    },
  },
  args: {
    isStretched: false,
  },
} satisfies Meta<typeof LocalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <LocalNavigation isStretched={args.isStretched}>
      <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
      <LocalNavigation.ButtonGroup>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation>
  ),
};

export const ButtonVisible: Story = {
  render: args => (
    <LocalNavigation {...args}>
      <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
      <LocalNavigation.ButtonGroup extraButtonVisible>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'LocalNavigation.ButtonGroup의 extraButtonVisible 옵션으로 로컬 네비게이션의 버튼 가시성을 설정할 수 있습니다. false를 기본값으로 가지며 해당 스토리는 true로 설정한 경우입니다.',
      },
    },
  },
};

export const NoTitle: Story = {
  render: args => (
    <LocalNavigation {...args}>
      <LocalNavigation.ButtonGroup extraButtonVisible>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation>
  ),
};

export const OnlyBackButton: Story = {
  render: args => <LocalNavigation {...args} />,
};

export const Responsive: Story = {
  render: function Render(args) {
    const { isMobile } = useMediaQueryFlags();
    const iconSize = isMobile ? 'lg' : 'xl';

    return (
      <div style={{ position: 'fixed', left: 0, right: 0 }}>
        <LocalNavigation isStretched={args.isStretched}>
          <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
          <LocalNavigation.ButtonGroup extraButtonVisible>
            <IconButton.Basic hierarchy='tertiary' size={iconSize} icon='blank' />
            <IconButton.Basic hierarchy='tertiary' size={iconSize} icon='blank' />
            <IconButton.Basic hierarchy='tertiary' size={iconSize} icon='blank' />
          </LocalNavigation.ButtonGroup>
        </LocalNavigation>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'desktop, tablet, mobile viewport에 따라 네비게이션의 스타일이 달라집니다.',
      },
    },
  },
};
