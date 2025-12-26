import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion } from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Accordion 컴포넌트는 Radix UI를 기반으로 만들어진 접고 펼칠 수 있는 컨텐츠 영역입니다.

**주요 기능:**
- Single 모드: 한 번에 하나의 아이템만 열 수 있습니다
- Multiple 모드: 여러 아이템을 동시에 열 수 있습니다
- Collapsible: Single 모드에서 열린 아이템을 다시 닫을 수 있습니다
- 키보드 네비게이션 지원
- WAI-ARIA 디자인 패턴 준수`,
      },
    },
  },
  argTypes: {
    type: {
      control: "radio",
      description: "아이템을 동시에 열 수 있는지, 없는지",
      options: ["single", "multiple"],
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isStretched: {
      control: "boolean",
      description: "컴포넌트 내부에 시각적 패딩 없이 늘려져 있는지의 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    defaultValue: {
      control: "text",
      description: "기본적으로 펼쳐져있는 아코디언아이템",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    collapsible: {
      control: "boolean",
      description: "열려 있는 아이템을 다시 클릭했을 때 닫을 수 있는지를 결정",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    type: "multiple",
    isStretched: false,
  },
} satisfies Meta<typeof Accordion.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  name: "Single 모드",
  parameters: {
    docs: {
      description: {
        story: `Single 모드에서는 한 번에 하나의 아이템만 열 수 있습니다. \`collapsible\` prop을 추가하면 열린 아이템을 다시 클릭하여 닫을 수 있습니다.`,
      },
    },
  },
  render: args => (
    <div style={{ width: "500px" }}>
      <Accordion.Root isStretched={args.isStretched} type='single' collapsible>
        <Accordion.Item value='item-1'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-2'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-3'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const Multiple: Story = {
  name: "Multiple 모드",
  parameters: {
    docs: {
      description: {
        story: `Multiple 모드에서는 여러 아이템을 동시에 열 수 있습니다. \`defaultValue\`에 배열을 전달하여 초기에 열려있을 아이템들을 지정할 수 있습니다.`,
      },
    },
  },
  render: args => (
    <div style={{ width: "500px" }}>
      <Accordion.Root isStretched={args.isStretched} type='multiple'>
        <Accordion.Item value='item-1'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-2'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-3'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const WithoutDefaultValue: Story = {
  name: "with Default Value",
  args: {},
  parameters: {
    docs: {
      description: {
        story: `\`defaultValue\`를 지정하지 않으면 모든 아이템이 닫힌 상태로 시작합니다.`,
      },
    },
  },
  render: args => (
    <div style={{ width: "500px" }}>
      <Accordion.Root
        isStretched={args.isStretched}
        defaultValue='item-1'
        type='single'
        collapsible
      >
        <Accordion.Item value='item-1'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-2'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-3'>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const DisabledItems: Story = {
  name: "Disabled",
  parameters: {
    docs: {
      description: {
        story: `Accordion.Item에 \`disabled\` prop을 사용하여 특정 아이템을 비활성화할 수 있습니다.`,
      },
    },
  },
  render: args => (
    <div style={{ width: "500px" }}>
      <Accordion.Root
        isStretched={args.isStretched}
        defaultValue='item-1'
        type='single'
        collapsible
      >
        <Accordion.Item value='item-1' disabled>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-2' disabled>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-3' disabled>
          <Accordion.Trigger withPrefixIcon='blank'>타이틀</Accordion.Trigger>
          <Accordion.Content>
            아코디언 콘텐츠 내용은 타이틀에 대한 상세 내용 및 설명을 포함합니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};
