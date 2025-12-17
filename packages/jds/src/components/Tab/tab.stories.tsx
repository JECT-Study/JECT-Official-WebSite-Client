import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Tab, TabContent, TabList, TabTrigger } from "./tab";

const tabItems = [
  {
    value: "overview",
    label: "개요",
    content: "제품 소개와 핵심 정보를 보여주는 콘텐츠입니다.",
  },
  {
    value: "details",
    label: "세부 정보",
    content: "스펙, 정책 등 상세한 정보를 확인할 수 있습니다.",
  },
  {
    value: "reviews",
    label: "리뷰",
    content: "사용자 후기와 피드백을 모아 보여줍니다.",
  },
];
//TODO: storybook 9버전 업데이트 이후 포맷변경
const meta = {
  title: "Components/Tab",
  component: Tab,
  subcomponents: { TabList, TabTrigger, TabContent },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "구성(슬롯)과 역할",
          "- Tab(Root): 탭의 루트 컨테이너. Radix UI Tabs Root와 동일한 props를 사용합니다. 제어/비제어 모드 모두 지원하며, value | defaultValue | onValueChange를 그대로 전달합니다.",
          "- TabList(List): 트리거들을 감싸는 리스트 영역(aria-role=tablist). 키보드 내비게이션과 접근성 동작은 Radix UI와 동일합니다.",
          "- TabTrigger(Trigger): 각 탭 버튼 요소(aria-role=tab). 활성화할 탭의 값을 value로 지정합니다. 포커스/선택 상태 로직은 Radix UI와 동일합니다.",
          "- TabContent(Content): 각 탭의 콘텐츠 영역(aria-role=tabpanel). 연결할 트리거와 동일한 value를 지정합니다.",
          "",
          "스타일 변형(Variants)",
          "- variant: 'header' | 'content' (스타일만 변경합니다. 동작/접근성은 동일)",
          "- layout: 'true' | 'false' (트리거를 리스트 너비에 맞춰 균등 분할)",
          "",
          "제어/비제어: value + onValueChange(제어) 또는 defaultValue(비제어)를 동일하게 지원합니다.",
          "",
          "중요: 모든 props와 동작은 Radix UI Tabs의 각 Primitive와 완전히 동일합니다. (예: Tab → Root, TabList → List, TabTrigger → Trigger, TabContent → Content)",
          "",
          "Root에 고정 width가 필요합니다.\n",
          "TabContent에는 스타일이 적용되어 있지 않습니다. 요구사항을 보고 적절한 스타일을 추가해야 합니다.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["header", "content"],
      description: "시각적 레시피 전환만 담당합니다. 기능/접근성은 Radix UI Tabs와 동일합니다.",
    },
    layout: {
      control: "radio",
      options: ["false", "true"],
      description: "트리거를 리스트 너비에 맞춰 균등 분할할지 여부(스타일 전용).",
    },
  },
  args: {
    variant: "header",
    layout: "hug",
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "기본 사용 예시. Radix UI Tabs와 동일하게 Tab에 value/defaultValue, onValueChange를 전달하고, TabTrigger/TabContent는 동일한 value를 사용합니다.",
      },
    },
  },
  render: args => (
    <Tab defaultValue={tabItems[0].value} {...args} css={{ width: 360 }}>
      <TabList aria-label='제품 정보'>
        {tabItems.map(item => (
          <TabTrigger key={item.value} value={item.value} disabled={item.value === "reviews"}>
            {item.label}
          </TabTrigger>
        ))}
      </TabList>

      {tabItems.map(item => (
        <TabContent key={item.value} value={item.value}>
          {item.content}
        </TabContent>
      ))}
    </Tab>
  ),
};

export const Stretched: Story = {
  args: {
    layout: "hug",
  },
  parameters: {
    docs: {
      description: { story: "리스트 너비를 트리거가 균등 분할하도록 스타일만 변경합니다." },
    },
  },
  render: args => (
    <Tab defaultValue={tabItems[0].value} {...args} css={{ width: 360 }}>
      <TabList aria-label='제품 정보'>
        {tabItems.map(item => (
          <TabTrigger key={item.value} value={item.value}>
            {item.label}
          </TabTrigger>
        ))}
      </TabList>

      {tabItems.map(item => (
        <TabContent key={item.value} value={item.value}>
          {item.content}
        </TabContent>
      ))}
    </Tab>
  ),
};

export const ContentVariant: Story = {
  args: {
    variant: "content",
  },
  parameters: {
    docs: {
      description: {
        story:
          "content 변형은 리스트 하단 보더와 인디케이터 없이 독립된 카드형 트리거 스타일을 제공합니다. Radix UI Tabs API는 동일합니다.",
      },
    },
  },
  render: args => (
    <Tab defaultValue={tabItems[0].value} {...args} css={{ width: 360 }}>
      <TabList aria-label='제품 정보'>
        {tabItems.map(item => (
          <TabTrigger key={item.value} value={item.value}>
            {item.label}
          </TabTrigger>
        ))}
      </TabList>

      {tabItems.map(item => (
        <TabContent key={item.value} value={item.value}>
          <div style={{ padding: "12px 8px" }}>{item.content}</div>
        </TabContent>
      ))}
    </Tab>
  ),
};

const overflowItems = Array.from({ length: 10 }).map((_, idx) => ({
  value: `tab-${idx}`,
  label: `섹션 ${idx + 1}`,
  content: `콘텐츠 ${idx + 1}번 영역입니다. 길이를 늘려서 스크롤 동작을 확인합니다.`,
}));

export const OverflowScrollable: Story = {
  args: {
    layout: "hug",
  },
  parameters: {
    docs: {
      description: {
        story:
          "리스트가 수평 스크롤 가능한 경우. 키보드 포커스/인디케이터가 스크롤과 동기화되며 Radix Tabs API와 동일하게 제어/비제어 모드를 지원합니다.",
      },
    },
  },
  render: args => (
    <Tab defaultValue={overflowItems[0].value} {...args} css={{ width: 320 }}>
      <TabList
        aria-label='스크롤 가능한 탭'
        css={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          paddingInline: "4px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          width: "100%",
          color: "red",
        }}
      >
        {overflowItems.map(item => (
          <TabTrigger key={item.value} value={item.value} css={{ borderRadius: 6 }}>
            {item.label}
          </TabTrigger>
        ))}
      </TabList>

      {overflowItems.map(item => (
        <TabContent key={item.value} value={item.value}>
          <div style={{ padding: "12px 8px" }}>{item.content}</div>
        </TabContent>
      ))}
    </Tab>
  ),
};

export const Customize: Story = {
  args: {
    variant: "header",
    layout: "hug",
  },
  parameters: {
    docs: {
      description: {
        story: "css prop으로 스타일을 오버라이드할 수 있습니다",
      },
    },
  },
  render: args => (
    <Tab {...args} css={{ width: 420 }}>
      <TabList
        aria-label='커스텀 탭'
        css={{
          background: "#f7f7ff",
          boxShadow: "inset 0 -1px rgba(0,0,0,0.08)",
          paddingInline: 6,
        }}
      >
        {tabItems.map(item => (
          <TabTrigger
            key={item.value}
            value={item.value}
            css={{ borderRadius: 6, padding: "10px 16px", fontWeight: 600, outlineOffset: -3 }}
          >
            {item.label}
          </TabTrigger>
        ))}
      </TabList>

      {tabItems.map(item => (
        <TabContent key={item.value} value={item.value}>
          <div style={{ padding: "12px 8px" }}>{item.content}</div>
        </TabContent>
      ))}
    </Tab>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "제어(Controlled) 모드 예시입니다. value와 onValueChange를 사용하여 외부 상태로 활성 탭을 관리합니다. Radix UI Tabs와 동일한 방식입니다.",
      },
    },
  },
  render: args => {
    const [value, setValue] = useState(tabItems[0].value);
    return (
      <Tab value={value} onValueChange={setValue} {...args} css={{ width: 360 }}>
        <TabList aria-label='제어 탭'>
          {tabItems.map(item => (
            <TabTrigger key={item.value} value={item.value}>
              {item.label}
            </TabTrigger>
          ))}
        </TabList>
        {tabItems.map(item => (
          <TabContent key={item.value} value={item.value}>
            {item.content}
          </TabContent>
        ))}
      </Tab>
    );
  },
};

export const Uncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "비제어(Uncontrolled) 모드 예시입니다. defaultValue만 지정하고 내부 상태로 활성 탭을 관리합니다. Radix UI Tabs와 동일한 방식입니다.",
      },
    },
  },
  render: args => (
    <Tab defaultValue={tabItems[0].value} {...args} css={{ width: 360 }}>
      <TabList aria-label='비제어 탭'>
        {tabItems.map(item => (
          <TabTrigger key={item.value} value={item.value}>
            {item.label}
          </TabTrigger>
        ))}
      </TabList>
      {tabItems.map(item => (
        <TabContent key={item.value} value={item.value}>
          {item.content}
        </TabContent>
      ))}
    </Tab>
  ),
};

export const ControlledVsUncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story: "한 화면에서 제어/비제어 사용법을 함께 비교합니다.",
      },
    },
  },
  render: args => {
    const [value, setValue] = useState(tabItems[0].value);
    return (
      <div style={{ display: "grid", gap: 24 }}>
        <section>
          <h4 style={{ margin: "0 0 8px" }}>제어(Controlled)</h4>
          <Tab value={value} onValueChange={setValue} {...args} css={{ width: 360 }}>
            <TabList aria-label='제어 탭'>
              {tabItems.map(item => (
                <TabTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabTrigger>
              ))}
            </TabList>
            {tabItems.map(item => (
              <TabContent key={item.value} value={item.value}>
                {item.content}
              </TabContent>
            ))}
          </Tab>
        </section>

        <section>
          <h4 style={{ margin: "0 0 8px" }}>비제어(Uncontrolled)</h4>
          <Tab defaultValue={tabItems[0].value} {...args} css={{ width: 360 }}>
            <TabList aria-label='비제어 탭'>
              {tabItems.map(item => (
                <TabTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabTrigger>
              ))}
            </TabList>
            {tabItems.map(item => (
              <TabContent key={item.value} value={item.value}>
                {item.content}
              </TabContent>
            ))}
          </Tab>
        </section>
      </div>
    );
  },
};
