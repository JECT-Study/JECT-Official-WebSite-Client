import type { Meta, StoryObj } from '@storybook/react';

import { Navigation } from './Navigation';
import { useNavigationVariant } from './useNavigationVariant';
import { Logo } from '../Logo';
import { SegmentedControl } from '../SegmentedControl';

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
  title: 'Components/Navigation',
  component: Navigation.Root,
  parameters: {
    // layout: 'centered',
    viewport: {
      viewports: customViewports,
    },
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </Navigation.LogoItem>
        <Navigation.List>
          <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
          <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
          <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
          <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
          <Navigation.BlockItem href='/'>지원하기</Navigation.BlockItem>
        </Navigation.List>
      </Navigation.Root>
    </div>
  ),
};

export const WithScrollVariant: Story = {
  render: function Render() {
    const variant = useNavigationVariant();

    return (
      <div style={{ height: '200vh', paddingTop: '100px' }}>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
          <Navigation.Root variant={variant}>
            <Navigation.LogoItem>
              <Logo href='/' hierarchy='primary' height={16} />
            </Navigation.LogoItem>
            <Navigation.List>
              <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
              <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
              <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
              <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
              <Navigation.BlockItem href='/apply'>지원하기</Navigation.BlockItem>
            </Navigation.List>
          </Navigation.Root>
        </div>
        <p style={{ textAlign: 'center' }}>스크롤하여 variant 변경을 확인하세요</p>
      </div>
    );
  },
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

export const Desktop: Story = {
  render: args => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </Navigation.LogoItem>
        <Navigation.List>
          <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
          <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
          <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
          <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
          <Navigation.BlockItem href='/apply'>지원하기</Navigation.BlockItem>
        </Navigation.List>
      </Navigation.Root>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          '데스크톱 화면에서의 내비게이션입니다. LabelButton size는 md, BlockButton size는 sm입니다.',
      },
    },
  },
};

export const Tablet: Story = {
  render: args => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </Navigation.LogoItem>
        <Navigation.List>
          <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
          <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
          <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
          <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
          <Navigation.BlockItem href='/apply'>지원하기</Navigation.BlockItem>
        </Navigation.List>
      </Navigation.Root>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          '태블릿 화면에서의 내비게이션입니다. LabelButton size는 xs, BlockButton size는 xs입니다.',
      },
    },
  },
};

export const Mobile: Story = {
  render: args => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </Navigation.LogoItem>
        <Navigation.List>
          <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
          <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
          <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
          <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
          <Navigation.BlockItem href='/apply'>지원하기</Navigation.BlockItem>
        </Navigation.List>
      </Navigation.Root>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story:
          '모바일 화면에서의 내비게이션입니다. 메뉴 아이템 대신 햄버거 메뉴 아이콘이 표시됩니다.',
      },
    },
  },
};

export const WithThemeSwitcher: Story = {
  render: function Render(args) {
    const handleThemeChange = (value: string) => {
      document.documentElement.setAttribute('data-theme', value);
    };

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Navigation.Root variant={args.variant}>
          <Navigation.LogoItem>
            <Logo href='/' hierarchy='primary' height={16} />
          </Navigation.LogoItem>
          <Navigation.List>
            <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
            <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
            <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
            <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
            <Navigation.BlockItem href='/apply'>지원하기</Navigation.BlockItem>
          </Navigation.List>
          <div style={{ width: '160px' }}>
            <SegmentedControl.Root defaultValue='light' size='xs' onValueChange={handleThemeChange}>
              <SegmentedControl.Item value='light'>라이트</SegmentedControl.Item>
              <SegmentedControl.Item value='dark'>다크</SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
        </Navigation.Root>
      </div>
    );
  },
  args: {
    variant: 'solid',
  },
  parameters: {
    docs: {
      description: {
        story:
          'SegmentedControl을 조합하여 테마 스위처를 포함한 내비게이션입니다. 세그먼트를 선택하면 실제로 테마가 변경됩니다.',
      },
    },
  },
};

export const WithLogoLink: Story = {
  render: args => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoLink href='/'>
          <Logo hierarchy='primary' height={16} />
        </Navigation.LogoLink>
        <Navigation.List>
          <Navigation.ToggleItem>젝트</Navigation.ToggleItem>
          <Navigation.ToggleItem>프로그램</Navigation.ToggleItem>
          <Navigation.ToggleItem>뉴스</Navigation.ToggleItem>
          <Navigation.ToggleItem>합류 가이드</Navigation.ToggleItem>
          <Navigation.BlockItem href='/apply'>지원하기</Navigation.BlockItem>
        </Navigation.List>
      </Navigation.Root>
    </div>
  ),
  args: {
    variant: 'solid',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Navigation.LogoLink를 사용하여 로고(div)를 클릭 가능한 링크로 만든 내비게이션입니다. NavigationMenu.Link를 사용하여 적절한 ARIA 속성을 제공합니다.',
      },
    },
  },
};
