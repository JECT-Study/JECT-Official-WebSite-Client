import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tab } from "./tab";

const meta = {
  title: "Components/Tab",
  component: Tab.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Tab 컴포넌트는 Radix UI를 기반으로 만들어진 탭 네비게이션입니다.

**주요 기능:**
- 키보드 네비게이션 지원 (화살표 키로 탭 전환)
- 자동 활성화 또는 수동 활성화 모드
- WAI-ARIA 디자인 패턴 준수`,
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "초기 활성 탭의 value를 설정합니다.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "탭의 방향을 설정합니다.",
      table: {
        defaultValue: { summary: "horizontal" },
      },
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
      description: "탭 항목이 늘려져있는지 여부 ",
    },
  },
  args: {
    variant: "header",
    isItemStretched: false,
  },
} satisfies Meta<typeof Tab.Root>;

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
      <Tab.Root {...args}>
        <Tab.List>
          <Tab.Trigger value='tab1' badge={"99"}>
            레이블
          </Tab.Trigger>
          <Tab.Trigger value='tab2'>레이블</Tab.Trigger>
          <Tab.Trigger value='tab3'>레이블</Tab.Trigger>
        </Tab.List>
        <Tab.Content value='tab1'>
          <h3>내용</h3>
          <p>콘텐츠</p>
        </Tab.Content>
        <Tab.Content value='tab2'>
          <h3>내용</h3>
          <p>콘텐츠</p>
        </Tab.Content>
        <Tab.Content value='tab3'>
          <h3>내용</h3>
          <p>콘텐츠</p>
        </Tab.Content>
      </Tab.Root>
    </div>
  ),
};

export const Disabled: Story = {
  name: "Disabled Tab Item",
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
      <Tab.Root {...args}>
        <Tab.List>
          <Tab.Trigger value='tab1'>Active</Tab.Trigger>
          <Tab.Trigger value='tab2' disabled>
            Disabled
          </Tab.Trigger>
          <Tab.Trigger value='tab3'>Active</Tab.Trigger>
        </Tab.List>
        <Tab.Content value='tab1'>
          <div style={{ padding: "20px" }}>This tab is active</div>
        </Tab.Content>
        <Tab.Content value='tab2'>
          <div style={{ padding: "20px" }}>This tab is disabled</div>
        </Tab.Content>
        <Tab.Content value='tab3'>
          <div style={{ padding: "20px" }}>This tab is also active</div>
        </Tab.Content>
      </Tab.Root>
    </div>
  ),
};
