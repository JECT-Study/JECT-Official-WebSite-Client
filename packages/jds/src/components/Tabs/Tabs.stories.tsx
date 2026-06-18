import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "동일한 화면 내에서 연관된 콘텐츠 뷰를 전환하며 탐색할 수 있도록 돕는 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "초기 활성 탭의 value를 설정합니다.",
    },
    activationMode: {
      control: "radio",
      options: ["automatic", "manual"],
      description:
        "탭 활성화 모드를 설정합니다. automatic은 포커스 시 자동 활성화, manual은 엔터/스페이스 키 필요",
      table: {
        defaultValue: { summary: "automatic" },
      },
    },
    variant: {
      control: "radio",
      options: ["header", "content"],
      description: "탭 스타일",
    },
    isItemStretched: {
      control: "boolean",
      description: "탭 항목이 전체 너비를 균등하게 나눠 갖는지 여부",
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    variant: "header",
    isItemStretched: false,
  },
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "tab1",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 탭 컴포넌트입니다. 여러 탭 간 전환할 수 있습니다.",
      },
    },
  },
  render: args => (
    <div style={{ width: "600px" }}>
      <Tabs.Root {...args}>
        <Tabs.List>
          <Tabs.Trigger value='tab1' badge='99'>
            레이블
          </Tabs.Trigger>
          <Tabs.Trigger value='tab2'>레이블</Tabs.Trigger>
          <Tabs.Trigger value='tab3'>레이블</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='tab1'>
          <h3>첫번째 내용</h3>
          <p>첫번째 콘텐츠</p>
        </Tabs.Content>
        <Tabs.Content value='tab2'>
          <h3>두번째 내용</h3>
          <p>두번째 콘텐츠</p>
        </Tabs.Content>
        <Tabs.Content value='tab3'>
          <h3>세번째 내용</h3>
          <p>세번째 콘텐츠</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: "tab1",
  },
  parameters: {
    docs: {
      description: {
        story: "특정 탭을 비활성화할 수 있습니다. `disabled` prop을 사용합니다.",
      },
    },
  },
  render: args => (
    <div style={{ width: "600px" }}>
      <Tabs.Root {...args}>
        <Tabs.List>
          <Tabs.Trigger value='tab1'>Active</Tabs.Trigger>
          <Tabs.Trigger value='tab2' disabled>
            Disabled
          </Tabs.Trigger>
          <Tabs.Trigger value='tab3'>Active</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='tab1'>
          <div style={{ padding: "20px" }}>This tab is active</div>
        </Tabs.Content>
        <Tabs.Content value='tab2'>
          <div style={{ padding: "20px" }}>This tab is disabled</div>
        </Tabs.Content>
        <Tabs.Content value='tab3'>
          <div style={{ padding: "20px" }}>This tab is also active</div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
};

export const DisabledSelected: Story = {
  args: {
    defaultValue: "tab2",
  },
  render: args => (
    <div style={{ width: "600px" }}>
      <Tabs.Root {...args}>
        <Tabs.List>
          <Tabs.Trigger value='tab1'>Active</Tabs.Trigger>
          <Tabs.Trigger value='tab2' disabled>
            Disabled Selected
          </Tabs.Trigger>
          <Tabs.Trigger value='tab3'>Active</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='tab1'>
          <div style={{ padding: "20px" }}>This tab is active</div>
        </Tabs.Content>
        <Tabs.Content value='tab2'>
          <div style={{ padding: "20px" }}>This tab is disabled and selected</div>
        </Tabs.Content>
        <Tabs.Content value='tab3'>
          <div style={{ padding: "20px" }}>This tab is also active</div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
};
