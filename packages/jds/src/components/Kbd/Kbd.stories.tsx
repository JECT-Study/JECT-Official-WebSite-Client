import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn } from "@storybook-utils/layout";

import { Kbd } from "./Kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `키보드 키는 키 입력이나 단축키 예시를 시각적으로 보여주는 텍스트 표시 컴포넌트입니다. 사용자는 키 조합을 한눈에 인지하고, 적절한 입력을 빠르게 할 수 있습니다. 문서, 튜토리얼, 도움말, 인앱 가이드 등에서 사용합니다.

### 글꼴

- 일반 키, 키 이름, 특수 키 기호를 모두 syntax 텍스트 스타일로 표시합니다.
- 글꼴은 \`ui-monospace\`를 먼저 지정해 사용자의 운영체제가 지정한 고정폭 글꼴을 우선 표시합니다. \`ui-monospace\`를 지원하지 않는 브라우저에서는 syntax 텍스트 스타일의 글꼴(D2Coding)로 표시합니다.
- 모든 환경에서 외형을 맞추는 책임을 시스템이 모두 지지 않고 운영체제 글꼴에 맡기므로, 키 기호의 모양은 운영체제마다 조금씩 다를 수 있습니다.

### 플랫폼에 맞는 표기 사용

- macOS에서는 command, option, control 등 macOS 키를 기준으로 표기합니다.
- Windows에서는 ctrl, alt 등 Windows 키를 기준으로 표기합니다.
- 사용자의 운영체제를 확인할 수 있으면 그 운영체제에 맞는 표기를 보여줍니다.
- 운영체제를 확인할 수 없거나, 여러 운영체제를 함께 안내해야 하면 되도록 두 운영체제의 표기를 모두 병기합니다.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
      description: "컴포넌트의 시각적 크기입니다.",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    isMuted: {
      control: "boolean",
      description: "시각적으로 강조도가 낮춰졌는지의 여부입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "키에 들어갈 텍스트 또는 아이콘입니다.",
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "K",
    size: "md",
    isMuted: false,
  },
};

export const AllSizes: Story = {
  args: {
    children: "Kbd",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <span>sm</span>
        <Kbd size='sm'>A</Kbd>
        <Kbd size='sm'>ctrl</Kbd>
        <Kbd size='sm'>⌘</Kbd>
      </FlexRow>
      <FlexRow>
        <span>md</span>
        <Kbd size='md'>A</Kbd>
        <Kbd size='md'>ctrl</Kbd>
        <Kbd size='md'>⌘</Kbd>
      </FlexRow>
      <FlexRow>
        <span>lg</span>
        <Kbd size='lg'>A</Kbd>
        <Kbd size='lg'>ctrl</Kbd>
        <Kbd size='lg'>⌘</Kbd>
      </FlexRow>
    </FlexColumn>
  ),
};

export const IsMuted: Story = {
  args: {
    children: "Kbd",
    size: "md",
  },
  render: ({ size }) => (
    <FlexRow>
      <Kbd size={size} isMuted>
        A
      </Kbd>
      <Kbd size={size} isMuted>
        ctrl
      </Kbd>
      <Kbd size={size} isMuted>
        ⌘
      </Kbd>
    </FlexRow>
  ),
};
