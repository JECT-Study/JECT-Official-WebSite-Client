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
        component:
          "키보드 키는 키 입력이나 단축키 예시를 시각적으로 보여주는 텍스트 표시 컴포넌트입니다. 사용자는 키 조합을 한눈에 인지하고, 적절한 입력을 빠르게 할 수 있습니다. 문서, 튜토리얼, 도움말, 인앱 가이드 등에서 사용합니다.",
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
    type: {
      control: "radio",
      options: ["key", "text", "function"],
      description: "역할이나 유형에 대한 구분입니다.",
      table: {
        defaultValue: { summary: "key" },
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
    type: "key",
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
        <Kbd size='sm' type='text'>
          ctrl
        </Kbd>
        <Kbd size='sm' type='function'>
          ⌘
        </Kbd>
      </FlexRow>
      <FlexRow>
        <span>md</span>
        <Kbd size='md'>A</Kbd>
        <Kbd size='md' type='text'>
          ctrl
        </Kbd>
        <Kbd size='md' type='function'>
          ⌘
        </Kbd>
      </FlexRow>
      <FlexRow>
        <span>lg</span>
        <Kbd size='lg'>A</Kbd>
        <Kbd size='lg' type='text'>
          ctrl
        </Kbd>
        <Kbd size='lg' type='function'>
          ⌘
        </Kbd>
      </FlexRow>
    </FlexColumn>
  ),
};

export const Types: Story = {
  args: {
    children: "kbd",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <span>key</span>
        <Kbd type='key'>A</Kbd>
        <Kbd type='key'>/</Kbd>
        <Kbd type='key'>\</Kbd>
      </FlexRow>
      <FlexRow>
        <span>text</span>
        <Kbd type='text'>ctrl</Kbd>
        <Kbd type='text'>alt</Kbd>
        <Kbd type='text'>tab</Kbd>
        <Kbd type='text'>esc</Kbd>
      </FlexRow>
      <FlexRow>
        <span>function</span>
        <Kbd type='function'>⌘</Kbd>
        <Kbd type='function'>⌥</Kbd>
        <Kbd type='function'>⇧</Kbd>
        <Kbd type='function'>⌃</Kbd>
        <Kbd type='function'>⌫</Kbd>
        <Kbd type='function'>⏎</Kbd>
      </FlexRow>
    </FlexColumn>
  ),
};

export const IsMuted: Story = {
  args: {
    children: "Kbd",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <span>key</span>
        <Kbd type='key' isMuted>
          A
        </Kbd>
        <Kbd type='key' isMuted>
          /
        </Kbd>
        <Kbd type='key' isMuted>
          \
        </Kbd>
      </FlexRow>
      <FlexRow>
        <span>text</span>
        <Kbd type='text' isMuted>
          ctrl
        </Kbd>
        <Kbd type='text' isMuted>
          alt
        </Kbd>
        <Kbd type='text' isMuted>
          tab
        </Kbd>
        <Kbd type='text' isMuted>
          esc
        </Kbd>
      </FlexRow>
      <FlexRow>
        <span>function</span>
        <Kbd type='function' isMuted>
          ⌘
        </Kbd>
        <Kbd type='function' isMuted>
          ⌥
        </Kbd>
        <Kbd type='function' isMuted>
          ⇧
        </Kbd>
        <Kbd type='function' isMuted>
          ⌃
        </Kbd>
        <Kbd type='function' isMuted>
          ⌫
        </Kbd>
        <Kbd type='function' isMuted>
          ⏎
        </Kbd>
      </FlexRow>
    </FlexColumn>
  ),
};
