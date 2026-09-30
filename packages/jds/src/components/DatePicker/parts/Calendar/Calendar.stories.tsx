import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";

import { Calendar } from "./Calendar";
import { DAYS_IN_WEEK } from "./calendar.types";
import { getGridDates, isSameDay } from "../../datePicker.utils";
import { Cell } from "../Cell";
import { WEEKDAY_OPTIONS, type Weekday } from "../WeekdayLabel";

const TODAY = new Date(2026, 8, 17);

interface MonthProps {
  year: number;
  month: number;
  weekStartsOn?: Weekday;
  weeks?: number;
  selected?: Date;
}

const Month = ({ year, month, weekStartsOn = 1, weeks, selected }: MonthProps) => {
  const dates = getGridDates(new Date(year, month, 1), weekStartsOn);

  return (
    <Calendar weekStartsOn={weekStartsOn}>
      {(weeks === undefined ? dates : dates.slice(0, weeks * DAYS_IN_WEEK)).map(date => (
        <Cell
          key={date.toISOString()}
          date={date}
          status={
            isSameDay(date, selected ?? null)
              ? "selected"
              : isSameDay(date, TODAY)
                ? "current"
                : "normal"
          }
          outsideMonth={date.getMonth() !== month}
        />
      ))}
    </Calendar>
  );
};

const meta: Meta<typeof Calendar> = {
  title: "Components/DatePicker/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker 달력 본문의 레이아웃 파츠입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. weekStartsOn에 맞춰 요일 헤더 행을 그리고, children으로 받은 날짜 셀을 7열 격자에 배치합니다. 배경과 radius는 이 파츠를 감싸는 상위 파츠가 그립니다. 어떤 날짜를 몇 칸 렌더링할지는 소비처가 정하고, 격자는 행 수를 고정하지 않습니다.",
      },
    },
  },
  argTypes: {
    weekStartsOn: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => <Month year={2026} month={8} selected={new Date(2026, 8, 30)} />,
};

export const SundayFirst: Story = {
  render: () => <Month year={2026} month={8} weekStartsOn={0} selected={new Date(2026, 8, 30)} />,
};

export const SixWeekMonth: Story = {
  render: () => <Month year={2026} month={7} />,
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
