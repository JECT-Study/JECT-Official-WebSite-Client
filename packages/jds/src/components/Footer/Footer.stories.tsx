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
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Footer.Root>
      <Footer.Content>
        <Footer.Header>
          <Footer.Logo>
            <FooterLogoSvg width={76} height={22} />
          </Footer.Logo>
          <Footer.Social
            github='https://github.com/JECT-Study'
            instagram='https://www.instagram.com/ject_official'
          />
        </Footer.Header>
        <Footer.Divider />
        <Footer.Nav sections={mockSections} />
        <Footer.Divider />
        <Footer.Bottom
          copyright='© 2025 JECT. All rights reserved.'
          email='jectofficial@ject.kr'
          privacyLink='https://privacy.ject.kr'
        />
      </Footer.Content>
    </Footer.Root>
  ),
};
