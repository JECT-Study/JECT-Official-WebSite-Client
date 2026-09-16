import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { WeekdayLabel } from "./WeekdayLabel";
import { WEEKDAY_OPTIONS } from "./weekdayLabel.types";
import { Cell } from "../Cell";

const MONDAY_FIRST_WEEKDAYS = [1, 2, 3, 4, 5, 6, 0] as const;

const SAMPLE_WEEK_DATES = [27, 28, 29, 30, 1, 2, 3].map((day, index) =>
  index < 4 ? new Date(2026, 8, day) : new Date(2026, 9, day),
);

const meta: Meta<typeof WeekdayLabel> = {
  title: "Components/DatePicker/WeekdayLabel",
  component: WeekdayLabel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker 달력 상단의 요일 헤더 한 칸입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. 변형과 인터랙션이 없는 순수 시각 파츠이고, 요일 문자열은 ko-KR 기준으로 내부에서 생성합니다. 요일을 어떤 순서로 나열할지는 소비처가 정합니다.",
      },
    },
  },
  argTypes: {
    weekday: {
      control: "select",
      options: WEEKDAY_OPTIONS,
      description:
        "요일 번호. 0이 일요일이고 6이 토요일로, Date.prototype.getDay() 규약을 따릅니다.",
    },
  },
} satisfies Meta<typeof WeekdayLabel>;

export default meta;

type Story = StoryObj<typeof WeekdayLabel>;

export const Default: Story = {
  args: {
    weekday: 1,
  },
};

export const SundayFirst: Story = {
  render: () => (
    <FlexRow gap='4px'>
      {WEEKDAY_OPTIONS.map(weekday => (
        <WeekdayLabel key={weekday} weekday={weekday} />
      ))}
    </FlexRow>
  ),
};

export const MondayFirst: Story = {
  render: () => (
    <FlexRow gap='4px'>
      {MONDAY_FIRST_WEEKDAYS.map(weekday => (
        <WeekdayLabel key={weekday} weekday={weekday} />
      ))}
    </FlexRow>
  ),
};

export const AlignedWithCells: Story = {
  render: () => (
    <FlexColumn gap='8px'>
      <FlexRow gap='4px'>
        {MONDAY_FIRST_WEEKDAYS.map(weekday => (
          <WeekdayLabel key={weekday} weekday={weekday} />
        ))}
      </FlexRow>
      <FlexRow gap='4px'>
        {SAMPLE_WEEK_DATES.map((date, index) => (
          <Cell
            key={date.toISOString()}
            date={date}
            status={index === 4 ? "current" : "normal"}
            outsideMonth={index >= 4}
          />
        ))}
      </FlexRow>
    </FlexColumn>
  ),
};
