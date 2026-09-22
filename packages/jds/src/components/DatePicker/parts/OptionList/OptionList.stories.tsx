import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { OptionList } from "./OptionList";
import { getMonthOptions, getYearOptions } from "../../datePicker.utils";
import { getCalendarBodyHeight } from "../Calendar";

const PANEL_WIDTH = 272;
const PANEL_PADDING = 12;
const SAMPLE_WEEK_COUNT = 5;
const BODY_HEIGHT = getCalendarBodyHeight(SAMPLE_WEEK_COUNT);

const SAMPLE_YEAR = 2026;

const MonthOptionList = () => {
  const [value, setValue] = useState("8");

  return (
    <OptionList
      aria-label='월 선택'
      height={BODY_HEIGHT}
      value={value}
      options={getMonthOptions(SAMPLE_YEAR)}
      onSelect={setValue}
    />
  );
};

const YearOptionList = () => {
  const [value, setValue] = useState(String(SAMPLE_YEAR));

  return (
    <OptionList
      aria-label='연도 선택'
      height={BODY_HEIGHT}
      value={value}
      options={getYearOptions(SAMPLE_YEAR - 10, SAMPLE_YEAR + 10)}
      onSelect={setValue}
    />
  );
};

const meta: Meta<typeof OptionList> = {
  title: "Components/DatePicker/OptionList",
  component: OptionList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker에서 연도와 월을 고르는 목록입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. 내부 프리미티브인 Listbox를 surface 없이 감싸 DatePicker 패널 표면 위에 바로 옵션만 그리고, 선택 값은 밖에서 통제합니다. 높이는 달력 본문 높이를 받아 맞추며, 처음 열릴 때 선택된 항목이 보이도록 스크롤합니다.",
      },
    },
  },
  argTypes: {
    options: { control: false, description: "표시할 옵션 목록" },
    value: { control: false, description: "선택된 옵션의 값" },
    height: { control: "text", description: "목록 높이. 넘기지 않으면 내용 높이를 따릅니다." },
    onSelect: { description: "옵션을 골랐을 때" },
  },
  decorators: [
    Story => (
      <div style={{ width: PANEL_WIDTH, padding: PANEL_PADDING }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionList>;

export default meta;

type Story = StoryObj<typeof OptionList>;

export const Month: Story = {
  render: () => <MonthOptionList />,
};

export const Year: Story = {
  render: () => <YearOptionList />,
};
