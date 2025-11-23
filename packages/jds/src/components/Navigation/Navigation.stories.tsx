import type { Meta, StoryObj } from '@storybook/react';

import { Navigation } from './Navigation';
import { useNavigationVariant } from './useNavigationVariant';
import { BlockButton } from '../Button/BlockButton';
import { Logo } from '../Logo';

const meta = {
  title: 'Components/Navigation',
  component: Navigation.Root,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['empty', 'solid'],
      description: '내비게이션 스타일',
    },
  },
  args: {
    variant: 'empty',
  },
} satisfies Meta<typeof Navigation.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Navigation.Root variant={args.variant}>
      <Navigation.LogoDiv>
        <Logo hierarchy='primary' height={16} />
      </Navigation.LogoDiv>
      <Navigation.List>
        <Navigation.Item>
          <Navigation.Trigger>젝트</Navigation.Trigger>
        </Navigation.Item>
        <Navigation.Item>
          <Navigation.Trigger>프로그램</Navigation.Trigger>
        </Navigation.Item>
        <Navigation.Item>
          <Navigation.Trigger>뉴스</Navigation.Trigger>
        </Navigation.Item>
        <Navigation.Item>
          <Navigation.Trigger>합류 가이드</Navigation.Trigger>
        </Navigation.Item>
        <BlockButton.Basic hierarchy='primary' size='sm' variant='solid'>
          지원하기
        </BlockButton.Basic>
      </Navigation.List>
    </Navigation.Root>
  ),
};

const ScrollVariantDemo = () => {
  const variant = useNavigationVariant();

  return (
    <div style={{ height: '200vh', paddingTop: '100px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Navigation.Root variant={variant}>
          <Navigation.LogoDiv>
            <Logo hierarchy='primary' height={16} />
          </Navigation.LogoDiv>
          <Navigation.List>
            <Navigation.Item>
              <Navigation.Trigger>젝트</Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Trigger>프로그램</Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Trigger>뉴스</Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Trigger>합류 가이드</Navigation.Trigger>
            </Navigation.Item>
            <BlockButton.Basic hierarchy='primary' size='sm' variant='solid'>
              지원하기
            </BlockButton.Basic>
          </Navigation.List>
        </Navigation.Root>
      </div>
      <p style={{ textAlign: 'center' }}>스크롤하여 variant 변경을 확인하세요</p>
    </div>
  );
};

export const WithScrollVariant: Story = {
  render: () => <ScrollVariantDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'useNavigationVariant 훅을 사용하여 스크롤 위치에 따라 variant가 자동으로 변경됩니다. 스크롤이 최상단이면 empty, 스크롤하면 solid로 변경됩니다.',
      },
    },
  },
};
