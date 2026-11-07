import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Item } from "./Item";

import { Code } from "@/components/Code";

const meta: Meta<typeof Item> = {
  title: "Components/TimePicker/Item",
  component: Item,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "TimePicker 열의 항목 한 칸을 그리는 내부 파츠입니다. 배럴에 공개되지 않으며 TimePicker 내부에서만 사용합니다. hover, active는 prop이 아니라 CSS 의사클래스로 표현되므로, 스토리에서 직접 마우스를 올리거나 눌러 확인합니다.",
      },
    },
  },
  argTypes: {
    value: { control: false, description: "열 안에서 항목을 구분하는 값" },
    label: { control: "text", description: "화면에 표시할 라벨" },
    selected: {
      control: "boolean",
      description: "선택 여부. 모습과 aria-selected를 함께 정합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    active: {
      control: "boolean",
      description:
        "키보드 활성 항목 여부. 열(listbox)에 키보드 포커스가 있을 때만 포커스 링이 보이므로 단독으로는 모습이 바뀌지 않습니다.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부. 비활성 모습으로 바꾸고 키보드 이동에서 건너뜁니다.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    value: "0",
    label: "00",
  },
} satisfies Meta<typeof Item>;

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`selected`와 `disabled`의 네 가지 조합입니다.",
          "- 미선택 항목은 hover, active에서 overlay가 진하게(bold), 선택 항목은 옅게(normal) 표시됩니다.",
          "- 비활성 항목은 overlay를 표시하지 않습니다. 선택이면서 비활성인 모습은 범위 밖의 값이 선택되었을 때 나타납니다.",
        ].join("\n"),
      },
    },
  },
  render: args => (
    <FlexRow gap='32px'>
      {[false, true].map(selected => (
        <FlexColumn key={String(selected)} gap='12px' style={{ alignItems: "center" }}>
          <Code>{`selected=${selected}`}</Code>
          {[false, true].map(disabled => (
            <FlexRow key={String(disabled)} gap='8px' style={{ alignItems: "center" }}>
              <Item {...args} selected={selected} disabled={disabled} />
              <Code>{`disabled=${disabled}`}</Code>
            </FlexRow>
          ))}
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};
