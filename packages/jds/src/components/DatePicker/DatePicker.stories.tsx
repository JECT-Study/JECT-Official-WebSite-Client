import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";
import { fn } from "storybook/test";

import { DatePicker } from "./DatePicker";
import { WEEKDAY_OPTIONS } from "./parts/WeekdayLabel";

const SAMPLE_MONTH = new Date(2026, 8, 1);

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "날짜 하나를 고르는 달력 패널입니다. 선택 값은 value를 넘기면 밖에서 통제하고, 넘기지 않으면 defaultValue를 시작값으로 DatePicker가 기억합니다. 표시 중인 달은 DatePicker가 기억하며 defaultMonth로 시작 달만 정합니다. 그리드 주 수는 달마다 4~6으로 알아서 조정됩니다. 헤더의 연도와 월 버튼을 누르면 같은 자리에 목록이 펼쳐지고, 고르면 달력으로 돌아옵니다. 팝오버 연결과 role='grid' 같은 접근성 구조는 아직 없습니다.",
      },
    },
  },
  argTypes: {
    value: { control: false, description: "선택된 날짜. 넘기면 밖에서 통제하는 방식이 됩니다." },
    defaultValue: {
      control: "date",
      description: "value를 넘기지 않을 때의 시작 선택값",
      table: { defaultValue: { summary: "null" } },
    },
    onChange: { description: "선택이 확정될 때. 액션 바가 있으면 적용을 눌러야 호출됩니다." },
    defaultMonth: {
      control: "date",
      description: "처음 보여줄 달",
      table: { defaultValue: { summary: "오늘" } },
    },
    weekStartsOn: {
      control: "select",
      options: WEEKDAY_OPTIONS,
      description: "주의 시작 요일. 0이 일요일이고 6이 토요일입니다.",
      table: { defaultValue: { summary: "1" } },
    },
    withActionBar: {
      control: "boolean",
      description:
        "하단 액션 바 표시 여부. 켜면 셀 클릭이 임시 선택이 되고 적용을 눌러야 확정됩니다.",
      table: { defaultValue: { summary: "false" } },
    },
    minYear: {
      control: "number",
      description: "연도 목록의 시작 연도",
      table: { defaultValue: { summary: "표시 연도 - 10" } },
    },
    maxYear: {
      control: "number",
      description: "연도 목록의 마지막 연도",
      table: { defaultValue: { summary: "표시 연도 + 10" } },
    },
  },
  args: {
    defaultMonth: SAMPLE_MONTH,
    onChange: fn(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithActionBar: Story = {
  args: {
    withActionBar: true,
  },
};

export const SundayFirst: Story = {
  args: {
    weekStartsOn: 0,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(2026, 8, 27),
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [date, setDate] = useState<Date | null>(new Date(2026, 8, 27));

    return (
      <FlexColumn gap='16px' style={{ alignItems: "center" }}>
        <DatePicker value={date} onChange={setDate} defaultMonth={SAMPLE_MONTH} />
        <FlexRow gap='8px'>
          <span>{date ? date.toLocaleDateString("ko-KR") : "선택 없음"}</span>
          <button type='button' onClick={() => setDate(null)}>
            초기화
          </button>
        </FlexRow>
      </FlexColumn>
    );
  },
};

export const YearRange: Story = {
  args: {
    minYear: 2020,
    maxYear: 2030,
  },
};

export const WeekCountByMonth: Story = {
  render: () => (
    <FlexRow gap='16px' style={{ alignItems: "flex-start" }}>
      <DatePicker defaultMonth={new Date(2026, 1, 1)} />
      <DatePicker defaultMonth={new Date(2026, 4, 1)} />
      <DatePicker defaultMonth={new Date(2026, 7, 1)} />
    </FlexRow>
  ),
};
