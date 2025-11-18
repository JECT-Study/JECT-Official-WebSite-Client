import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';
import type { FooterSection } from './footer.types';
import FooterLogoSvg from '../Icon/generated/FooterLogo';

const mockSections: FooterSection[] = [
  {
    title: '젝트',
    links: [
      { label: '비전과 스토리', href: '/about' },
      {
        label: 'JDS',
        href: 'https://www.figma.com/community/file/1547190026603503566',
        external: true,
      },
    ],
  },
  {
    title: '프로그램',
    links: [
      { label: '팀 프로젝트', href: '/project' },
      { label: '미니 스터디', href: '/mini-study' },
      { label: '라이브 세션', href: '/live-session' },
      { label: '협업 가이드', href: '/guide' },
      { label: '네트워킹', href: '/networking' },
    ],
  },
  {
    title: '뉴스',
    links: [
      { label: '활동 후기', href: '/activity' },
      { label: '메이커스 블로그', href: 'https://blog.ject.kr', external: true },
    ],
  },
  {
    title: '문의',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: '직접 문의', href: '/contact' },
    ],
  },
];

const meta: Meta<typeof Footer.Root> = {
  title: 'Components/Footer',
  component: Footer.Root,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      description: 'Footer의 레이아웃 variant',
      table: {
        defaultValue: { summary: 'desktop' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    variant: 'desktop',
    children: null,
  },
  render: args => (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Footer.Root variant={args.variant}>
        <Footer.Header>
          <Footer.Logo>
            <FooterLogoSvg width={72} height={18} />
          </Footer.Logo>
          <Footer.Social
            github='https://github.com/JECT-Study'
            instagram='https://www.instagram.com/ject_official'
          />
        </Footer.Header>
        <Footer.Divider />
        <Footer.Nav sections={mockSections} variant={args.variant} />
        <Footer.Divider />
        <Footer.Bottom
          copyright='© 2025 JECT. All rights reserved.'
          email='jectofficial@ject.kr'
          privacyLink='https://privacy.ject.kr'
        />
      </Footer.Root>
    </div>
  ),
};

export const Tablet: Story = {
  args: {
    variant: 'tablet',
    children: null,
  },
  render: args => (
    <div style={{ maxWidth: '768px', margin: '0 auto' }}>
      <Footer.Root variant={args.variant}>
        <Footer.Header>
          <Footer.Logo>
            <FooterLogoSvg width={72} height={18} />
          </Footer.Logo>
          <Footer.Social
            github='https://github.com/JECT-Study'
            instagram='https://www.instagram.com/ject_official'
          />
        </Footer.Header>
        <Footer.Divider />
        <Footer.Nav sections={mockSections} variant={args.variant} />
        <Footer.Divider />
        <Footer.Bottom
          copyright='© 2025 JECT. All rights reserved.'
          email='jectofficial@ject.kr'
          privacyLink='https://privacy.ject.kr'
        />
      </Footer.Root>
    </div>
  ),
};

export const Mobile: Story = {
  args: {
    variant: 'mobile',
    children: null,
  },
  render: args => (
    <div style={{ maxWidth: '360px', margin: '0 auto' }}>
      <Footer.Root variant={args.variant}>
        <Footer.Header>
          <Footer.Logo>
            <FooterLogoSvg width={72} height={18} />
          </Footer.Logo>
          <Footer.Social
            github='https://github.com/JECT-Study'
            instagram='https://www.instagram.com/ject_official'
            iconSize='sm'
          />
        </Footer.Header>
        <Footer.Divider />
        <Footer.Nav sections={mockSections} variant={args.variant} />
        <Footer.Divider />
        <Footer.Bottom
          copyright='© 2025 JECT'
          email='jectofficial@ject.kr'
          privacyLink='https://privacy.ject.kr'
        />
      </Footer.Root>
    </div>
  ),
};
