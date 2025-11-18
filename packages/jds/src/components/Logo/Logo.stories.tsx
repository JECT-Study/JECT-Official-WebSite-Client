import type { Meta, StoryObj } from '@storybook/react';
import { FlexRow, FlexColumn, Label } from '@storybook-utils/layout';
import { Logo } from 'components';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '로고의 시각적-맥락적 위계 구분',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    height: {
      control: { type: 'number', min: 16, max: 128, step: 4 },
      description: '로고의 높이 (width는 140:32 비율로 자동 계산)',
      table: {
        defaultValue: { summary: '32' },
      },
    },
    href: {
      control: 'text',
      description: '로고 클릭 시 이동할 URL (있으면 a 태그, 없으면 div)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hierarchy: 'primary',
    height: 32,
  },
};

export const AllHierarchies: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Primary:</Label>
        <Logo hierarchy='primary' height={32} />
      </FlexRow>
      <FlexRow>
        <Label>Secondary:</Label>
        <Logo hierarchy='secondary' height={32} />
      </FlexRow>
      <FlexRow>
        <Label>Tertiary:</Label>
        <Logo hierarchy='tertiary' height={32} />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: 'hierarchy에 따라 로고의 색상이 달라집니다.',
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>1번 예시 (24px):</Label>
        <Logo height={24} hierarchy='primary' />
      </FlexRow>
      <FlexRow>
        <Label>기본 값 (32px):</Label>
        <Logo height={32} hierarchy='primary' />
      </FlexRow>
      <FlexRow>
        <Label>2번 예시 (48px):</Label>
        <Logo height={48} hierarchy='primary' />
      </FlexRow>
      <FlexRow>
        <Label>3번 예시 (64px):</Label>
        <Logo height={64} hierarchy='primary' />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'height prop으로 로고 크기를 조절할 수 있습니다. width는 140:32 비율로 자동 계산됩니다.',
      },
    },
  },
};

export const HierarchyWithSizes: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Logo height={24} hierarchy='primary' />
        <Logo height={32} hierarchy='primary' />
        <Logo height={48} hierarchy='primary' />
      </FlexRow>
      <FlexRow>
        <Logo height={24} hierarchy='secondary' />
        <Logo height={32} hierarchy='secondary' />
        <Logo height={48} hierarchy='secondary' />
      </FlexRow>
      <FlexRow>
        <Logo height={24} hierarchy='tertiary' />
        <Logo height={32} hierarchy='tertiary' />
        <Logo height={48} hierarchy='tertiary' />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: 'hierarchy와 height를 조합한 다양한 로고 스타일을 보여줍니다.',
      },
    },
  },
};

export const InteractionStates: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Primary</Label>
        <Logo hierarchy='primary' height={32} href='/' onClick={e => e.preventDefault()} />
        <Label>(Tab을 사용)</Label>
      </FlexRow>
      <FlexRow>
        <Label>Secondary</Label>
        <Logo hierarchy='secondary' height={32} href='/' onClick={e => e.preventDefault()} />
        <Label>(Tab을 사용)</Label>
      </FlexRow>
      <FlexRow>
        <Label>Tertiary</Label>
        <Logo hierarchy='tertiary' height={32} href='/' onClick={e => e.preventDefault()} />
        <Label>(Tab을 사용)</Label>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '로고는 rest, focus 상태를 가지며 InteractionLayer가 적용됩니다. ' +
          '탭 키로 포커스를 이동시켜 focus 상태를 확인할 수 있습니다.',
      },
    },
  },
};

export const WithLink: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>로고 (a 태그)</Label>
        <Logo href='/' hierarchy='primary' height={32} onClick={e => e.preventDefault()} />
      </FlexRow>
      <FlexRow>
        <Label>로고 (div 태그)</Label>
        <Logo hierarchy='primary' height={32} />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'href prop이 있으면 자동으로 a 태그로 렌더링되며, 없으면 div로 렌더링됩니다. ' +
          'a 태그일 때는 네비게이션, 우클릭 메뉴, 키보드 네비게이션 등 모든 브라우저 기본 기능을 사용할 수 있습니다.',
      },
    },
  },
};

export const TabIndexBehavior: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>a 태그 + href (기본)</Label>
        <Logo href='/' hierarchy='primary' height={32} onClick={e => e.preventDefault()} />
        <Label>암묵적 tabIndex=0, 포커스 가능</Label>
      </FlexRow>
      <FlexRow>
        <Label>a 태그 + href + tabIndex={-1}</Label>
        <Logo
          href='/'
          hierarchy='primary'
          height={32}
          tabIndex={-1}
          onClick={e => e.preventDefault()}
        />
        <Label>명시적 오버라이드, 포커스 불가</Label>
      </FlexRow>
      <FlexRow>
        <Label>div 태그 (기본)</Label>
        <Logo hierarchy='primary' height={32} />
        <Label>tabIndex 없음, 포커스 불가</Label>
      </FlexRow>
      <FlexRow>
        <Label>div 태그 + tabIndex={0}</Label>
        <Logo hierarchy='primary' height={32} tabIndex={0} />
        <Label>명시적 설정, 포커스 가능</Label>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'tabIndex는 각 시맨틱 태그의 기본 포커스 정책을 따릅니다:\n\n' +
          '• a 태그 + href: 암묵적으로 tabIndex=0 (포커스 가능)\n' +
          '• a 태그 (href 없음): 포커스 불가 (브라우저 기본 동작)\n' +
          '• div 태그: 기본적으로 포커스 불가\n' +
          '• 필요한 경우 tabIndex prop을 명시적으로 전달하여 오버라이드 가능',
      },
    },
  },
};

export const WithReactRouter: Story = {
  render: () => {
    const handleNavigate = (path: string) => {
      console.log(`Navigate to: ${path}`);
      //NOTE: 실제 사용 시: navigate(path)
    };

    return (
      <FlexColumn>
        <FlexRow>
          <Logo
            href='/dashboard'
            hierarchy='primary'
            height={32}
            onClick={e => {
              e.preventDefault();
              handleNavigate('/dashboard');
            }}
          />
        </FlexRow>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'React Router와 함께 사용할 때는 href를 설정하고 onClick에서 e.preventDefault()를 호출한 후 navigate()를 실행합니다.',
      },
    },
  },
};

export const ExternalLink: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Logo
          href='https://ject.kr'
          target='_blank'
          rel='noopener noreferrer'
          hierarchy='primary'
          height={32}
        />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: '외부 링크는 target="_blank"와 rel="noopener noreferrer"를 함께 사용합니다.',
      },
    },
  },
};

export const UsageExample: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>예시 1</Label>
        <Logo href='/' height={48} hierarchy='primary' onClick={e => e.preventDefault()} />
      </FlexRow>
      <FlexRow>
        <Label>예시 2</Label>
        <Logo href='/' height={32} hierarchy='primary' onClick={e => e.preventDefault()} />
      </FlexRow>
      <FlexRow>
        <Label>예시 3</Label>
        <Logo href='/' height={24} hierarchy='secondary' onClick={e => e.preventDefault()} />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '로고는 서비스의 아이덴티티를 표시하며, 웹사이트 내의 랜딩 페이지로 연결을 돕는 역할을 합니다. ' +
          'href prop을 전달하면 자동으로 네비게이션 링크로 작동합니다.',
      },
    },
  },
};
