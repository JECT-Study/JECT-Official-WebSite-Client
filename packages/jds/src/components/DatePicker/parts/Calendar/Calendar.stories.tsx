import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";

import { Calendar } from "./Calendar";
import { DAYS_IN_WEEK } from "./calendar.types";
import { Cell } from "../Cell";
import { WEEKDAY_OPTIONS, type Weekday } from "../WeekdayLabel";

const WEEKS_IN_GRID = 6;

const TODAY = new Date(2026, 8, 17);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const buildGridDates = (year: number, month: number, weekStartsOn: Weekday, weeks: number) => {
  const leadingDays =
    (new Date(year, month, 1).getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;

  return Array.from(
    { length: weeks * DAYS_IN_WEEK },
    (_, index) => new Date(year, month, 1 - leadingDays + index),
  );
};

interface MonthProps {
  year: number;
  month: number;
  weekStartsOn?: Weekday;
  weeks?: number;
  selected?: Date;
}

const Month = ({ year, month, weekStartsOn = 1, weeks = WEEKS_IN_GRID, selected }: MonthProps) => (
  <Calendar.Root>
    <Calendar.Weekdays weekStartsOn={weekStartsOn} />
    <Calendar.Grid>
      {buildGridDates(year, month, weekStartsOn, weeks).map(date => (
        <Cell
          key={date.toISOString()}
          date={date}
          status={
            selected && isSameDay(date, selected)
              ? "selected"
              : isSameDay(date, TODAY)
                ? "current"
                : "normal"
          }
          outsideMonth={date.getMonth() !== month}
        />
      ))}
    </Calendar.Grid>
  </Calendar.Root>
);

const meta: Meta<typeof Calendar.Root> = {
  title: "Components/DatePicker/Calendar",
  component: Calendar.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker 달력 본문의 레이아웃 파츠입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. Calendar.Root가 패딩과 세로 간격을, Calendar.Weekdays가 요일 헤더 행을, Calendar.Grid가 7열 격자를 담당합니다. 배경과 radius는 이 파츠를 감싸는 상위 파츠가 그립니다. 어떤 날짜를 몇 칸 렌더링할지는 소비처가 정하고, Grid는 행 수를 고정하지 않습니다.",
      },
    },
  },
} satisfies Meta<typeof Calendar.Root>;

export default meta;

type Story = StoryObj<typeof Calendar.Root>;

export const Default: Story = {
  render: () => <Month year={2026} month={8} selected={new Date(2026, 8, 30)} />,
};

export const SundayFirst: Story = {
  render: () => <Month year={2026} month={8} weekStartsOn={0} selected={new Date(2026, 8, 30)} />,
};

export const FiveWeekMonth: Story = {
  render: () => <Month year={2026} month={9} weeks={5} />,
};

export const WeekStartVariations: Story = {
  render: () => (
    <FlexRow gap='0px'>
      {WEEKDAY_OPTIONS.map(weekStartsOn => (
        <Month key={weekStartsOn} year={2026} month={8} weekStartsOn={weekStartsOn} weeks={2} />
      ))}
    </FlexRow>
  ),
};
