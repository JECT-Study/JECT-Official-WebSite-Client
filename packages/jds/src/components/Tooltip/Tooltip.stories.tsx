import type { Meta, StoryObj } from "@storybook/react";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { Icon, IconButton, Input, Tooltip, BlockButton } from "components";
import { Label as LabelComponent } from "components";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip.Content,
  decorators: [
    Story => (
      <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
        <Story />
      </Tooltip.Provider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "툴팁 표시 위치",
      table: {
        defaultValue: { summary: "top" },
      },
    },
    sideOffset: {
      control: "number",
      description: "트리거 요소와의 간격 (px)",
      table: {
        defaultValue: { summary: "8" },
      },
    },
    avoidCollisions: {
      control: "boolean",
      description: "뷰포트 충돌 방지 자동 위치 조정",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
} satisfies Meta<typeof Tooltip.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <IconButton.Basic icon="information-line" />
      </Tooltip.Trigger>
      <Tooltip.Content {...args}>툴팁 테스트 레이블</Tooltip.Content>
    </Tooltip.Root>
  ),
  args: {
    side: "top",
    sideOffset: 8,
    avoidCollisions: true,
  },
};

export const AllSides: Story = {
  args: { children: undefined },
  render: () => (
    <FlexColumn gap="60px">
      <FlexRow gap="24px">
        <FlexColumn gap="12px">
          <Label>Top (기본값)</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <IconButton.Basic icon="information-line" />
            </Tooltip.Trigger>
            <Tooltip.Content side="top">툴팁 상단</Tooltip.Content>
          </Tooltip.Root>
        </FlexColumn>

        <FlexColumn gap="12px">
          <Label>Right</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <IconButton.Basic icon="information-line" />
            </Tooltip.Trigger>
            <Tooltip.Content side="right">툴팁 우측</Tooltip.Content>
          </Tooltip.Root>
        </FlexColumn>

        <FlexColumn gap="12px">
          <Label>Bottom</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <IconButton.Basic icon="information-line" />
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom">툴팁 아래</Tooltip.Content>
          </Tooltip.Root>
        </FlexColumn>

        <FlexColumn gap="12px">
          <Label>Left</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <IconButton.Basic icon="information-line" />
            </Tooltip.Trigger>
            <Tooltip.Content side="left">툴팁 좌측</Tooltip.Content>
          </Tooltip.Root>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "툴팁은 네 가지 방향(top, right, bottom, left)으로 표시할 수 있습니다. avoidCollisions가 활성화되어 공간이 부족하면 자동으로 다른 방향으로 전환됩니다.",
      },
    },
  },
};

export const LongContent: Story = {
  args: { children: undefined },
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <BlockButton.Basic hierarchy="accent">표시되는 요소가 길 경우</BlockButton.Basic>
      </Tooltip.Trigger>
      <Tooltip.Content>
        아주 아주 아주 아주 긴 요소입니다. 모바일 환경에서도 정상적인 툴팁 내용이 표시되어야하기
        때문에 이러한 처리를 하였습니다. 최대 길이는 320px이며 이 후 자동으로 줄바꿈 됩니다.
      </Tooltip.Content>
    </Tooltip.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트는 자동으로 줄바꿈되며, 최대 너비는 320px입니다.",
      },
    },
  },
};

export const WithCustomOffset: Story = {
  args: { children: undefined },
  render: () => (
    <FlexRow gap="24px">
      <FlexColumn gap="12px">
        <Label>오프셋 기본값(8px)</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <BlockButton.Basic hierarchy="accent">기본 오프셋</BlockButton.Basic>
          </Tooltip.Trigger>
          <Tooltip.Content sideOffset={8}>트리거 요소로 부터 8px</Tooltip.Content>
        </Tooltip.Root>
      </FlexColumn>

      <FlexColumn gap="12px">
        <Label>오프셋 커스텀(24px)</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <BlockButton.Basic hierarchy="accent">커스텀(확장) 오프셋</BlockButton.Basic>
          </Tooltip.Trigger>
          <Tooltip.Content sideOffset={24}>트리거 요소로 부터 24px</Tooltip.Content>
        </Tooltip.Root>
      </FlexColumn>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: "sideOffset prop으로 트리거 요소와 툴팁 사이의 간격을 조절할 수 있습니다.",
      },
    },
  },
};

export const CustomTrigger: Story = {
  args: { children: undefined },
  render: () => (
    <FlexColumn gap="24px">
      <div>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <LabelComponent as="span">텍스트 레이블입니다.</LabelComponent>
          </Tooltip.Trigger>
          <Tooltip.Content>레이블</Tooltip.Content>
        </Tooltip.Root>
      </div>

      <FlexColumn gap="12px">
        <Label>Icon 컴포넌트</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Icon name="information-line" size="lg" />
          </Tooltip.Trigger>
          <Tooltip.Content>아이콘 툴팁</Tooltip.Content>
        </Tooltip.Root>
      </FlexColumn>

      <FlexColumn gap="12px">
        <Label>Icon 버튼</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconButton.Basic icon="alert-line" />
          </Tooltip.Trigger>
          <Tooltip.Content>아이콘 버튼 툴팁</Tooltip.Content>
        </Tooltip.Root>
      </FlexColumn>

      <FlexColumn gap="12px">
        <Label>Input 예시</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Input.TextField value="레이블 명" onChange={e => e.preventDefault()} />
          </Tooltip.Trigger>
          <Tooltip.Content side="top" sideOffset={12}>
            안녕하세요? 툴팁입니다.
          </Tooltip.Content>
        </Tooltip.Root>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "툴팁은 다양한 Interactive한 요소에 적용할 수 있습니다. 다만, forwardRef 로 래핑된 요소나 Content 자체에 Html Element를 가진 요소이어야 합니다. 버튼, 텍스트, 아이콘, 입력 필드 등 어떤 요소든 트리거로 사용할 수 있습니다.",
      },
    },
  },
};
