import type { Meta, StoryObj } from '@storybook/react';

import { Navigation } from './Navigation';
import { useNavigationVariant } from './useNavigationVariant';
import { BlockButton } from '../Button/BlockButton';
import { LabelButton } from '../Button/LabelButton';
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
        <Navigation.Divider />
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                젝트
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                프로그램
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                뉴스
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                합류 가이드
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert('hello!')}>
              지원하기
            </BlockButton.Basic>
          </Navigation.Item>
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
            <Navigation.Divider />
            <Navigation.List>
              <Navigation.Item>
                <Navigation.Trigger asChild>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    젝트
                  </LabelButton.Basic>
                </Navigation.Trigger>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Trigger asChild>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    프로그램
                  </LabelButton.Basic>
                </Navigation.Trigger>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Trigger asChild>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    뉴스
                  </LabelButton.Basic>
                </Navigation.Trigger>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Trigger asChild>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    합류 가이드
                  </LabelButton.Basic>
                </Navigation.Trigger>
              </Navigation.Item>
              <Navigation.Item>
                <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert('hello!')}>
                  지원하기
                </BlockButton.Basic>
              </Navigation.Item>
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

export const Viewport: Story = {
  render: args => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </Navigation.LogoItem>
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                젝트
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                프로그램
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                뉴스
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                합류 가이드
              </LabelButton.Basic>
            </Navigation.Trigger>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Link href='/apply' asChild>
              <BlockButton.Basic hierarchy='primary' size='sm'>
                지원하기
              </BlockButton.Basic>
            </Navigation.Link>
          </Navigation.Item>
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
        story: 'desktop, tablet, mobile viewport에 따라 네비게이션의 스타일이 달라집니다.',
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
            <Navigation.Item>
              <Navigation.Trigger asChild>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  젝트
                </LabelButton.Basic>
              </Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Trigger asChild>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  프로그램
                </LabelButton.Basic>
              </Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Trigger asChild>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  뉴스
                </LabelButton.Basic>
              </Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Trigger asChild>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  합류 가이드
                </LabelButton.Basic>
              </Navigation.Trigger>
            </Navigation.Item>
            <Navigation.Item>
              <Navigation.Link href='/apply' asChild>
                <BlockButton.Basic hierarchy='primary' size='sm'>
                  지원하기
                </BlockButton.Basic>
              </Navigation.Link>
            </Navigation.Item>
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

const TempNavigationContent = () => {
  return (
    <div
      style={{
        width: '922px',
        height: '424px',
        border: '1px solid #ECEDF9',
        borderRadius: '10px',
        background: '#ECEDF9',
      }}
    />
  );
};

export const WithContent: Story = {
  render: args => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Navigation.Root variant={args.variant}>
        <Navigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </Navigation.LogoItem>

        <Navigation.List>
          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                서비스
              </LabelButton.Basic>
            </Navigation.Trigger>
            <Navigation.Content>
              <TempNavigationContent />
            </Navigation.Content>
          </Navigation.Item>

          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                프로그램
              </LabelButton.Basic>
            </Navigation.Trigger>
            <Navigation.Content>
              <TempNavigationContent />
            </Navigation.Content>
          </Navigation.Item>

          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                뉴스
              </LabelButton.Basic>
            </Navigation.Trigger>
            <Navigation.Content>
              <TempNavigationContent />
            </Navigation.Content>
          </Navigation.Item>

          <Navigation.Item>
            <Navigation.Trigger asChild>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                합류 가이드
              </LabelButton.Basic>
            </Navigation.Trigger>
            <Navigation.Content>
              <TempNavigationContent />
            </Navigation.Content>
          </Navigation.Item>

          <Navigation.Item>
            <Navigation.Link href='/apply' asChild>
              <BlockButton.Basic hierarchy='primary' size='sm'>
                지원하기
              </BlockButton.Basic>
            </Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation.Root>
    </div>
  ),
  args: {
    variant: 'empty',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`Navigation.Content`를 사용하여 토글 메뉴에 드롭다운 패널을 구성한 예시입니다. LabelButton과 BlockButton을 외부에서 조합하여 사용합니다.',
      },
    },
  },
};
