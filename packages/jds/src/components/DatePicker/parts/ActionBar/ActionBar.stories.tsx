import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { ActionBar } from "./ActionBar";

const PANEL_WIDTH = 272;

const meta: Meta<typeof ActionBar> = {
  title: "Components/DatePicker/ActionBar",
  component: ActionBar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker 하단의 보조 액션 줄입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. 오늘, 지우기, 적용 세 버튼으로 형태가 고정되어 있어 슬롯을 열지 않고 핸들러만 받습니다. 위쪽 구분선은 이 파츠가 직접 그리고, 너비를 고정하지 않으므로 부모 폭을 따릅니다.",
      },
    },
  },
  argTypes: {
    onToday: { description: "오늘 버튼을 눌렀을 때" },
    onClear: { description: "지우기 버튼을 눌렀을 때" },
    onApply: { description: "적용 버튼을 눌렀을 때" },
    applyDisabled: {
      control: "boolean",
      description: "적용 버튼 비활성화 여부. 선택된 날짜가 없을 때 사용합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    clearDisabled: {
      control: "boolean",
      description: "지우기 버튼 비활성화 여부",
      table: { defaultValue: { summary: "false" } },
    },
    todayDisabled: {
      control: "boolean",
      description: "오늘 버튼 비활성화 여부. 오늘이 선택할 수 없는 날짜일 때 사용합니다.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    onToday: fn(),
    onClear: fn(),
    onApply: fn(),
  },
  decorators: [
    Story => (
      <div style={{ width: PANEL_WIDTH }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionBar>;

export default meta;

type Story = StoryObj<typeof ActionBar>;

export const Default: Story = {};

export const ApplyDisabled: Story = {
  args: {
    applyDisabled: true,
  },
};

export const TodayDisabled: Story = {
  args: {
    todayDisabled: true,
  },
};
