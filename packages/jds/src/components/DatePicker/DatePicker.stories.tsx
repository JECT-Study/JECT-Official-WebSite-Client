import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { DatePicker } from "./DatePicker";
import { WEEKDAY_OPTIONS } from "./datePicker.types";

import { Code } from "@/components/Code";

const SAMPLE_MONTH = new Date(2026, 2, 1);
const SAMPLE_DATE = new Date(2026, 2, 12);
const SAMPLE_OUTSIDE_DATE = new Date(2026, 1, 28);

const PropertyLabel = ({ name, value }: { name: string; value: string }) => (
  <FlexRow gap='6px' style={{ alignItems: "center" }}>
    <span>{name}</span>
    <Code>{value}</Code>
  </FlexRow>
);

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "캘린더 보기에서 특정 날짜를 선택해 입력하는 컴포넌트입니다. 원하는 연도와 월을 탐색할 수 있어 사용자의 빠른 날짜 입력을 돕습니다.",
          "DatePicker는 Button(Label button, Icon button)과 DatePicker Cell로 구성됩니다. 헤더의 연도와 월은 Label button, 이전 달과 다음 달은 Icon button이며, 액션 바의 오늘, 지우기, 적용도 Label button입니다.",
          "선택 값은 `value`를 넘기면 호출부가 소유하고, 넘기지 않으면 `defaultValue`로 시작해 DatePicker가 기억합니다. 표시 중인 달은 DatePicker가 관리하며, 달은 이전 달, 다음 달 버튼과 연월 목록으로만 이동합니다. 달력은 `role='grid'`로 노출되며 방향키로 날짜를 이동합니다. 팝오버 연결은 아직 없습니다.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: "date" },
    month: { control: false },
    defaultMonth: { control: "date" },
    weekStartsOn: { control: "select", options: WEEKDAY_OPTIONS },
    withActionBar: { control: "boolean" },
    fixedWeeks: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    minDate: { control: false },
    maxDate: { control: false },
    isDateDisabled: { control: false },
  },
  args: {
    defaultMonth: SAMPLE_MONTH,
    onChange: fn(),
    onMonthChange: fn(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const Keyboard: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "달력은 [APG Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)의 격자 패턴을 따릅니다. 격자 안에서 Tab 정지점은 하나이며, 날짜 사이는 키보드로 이동합니다.",
          "",
          "| 키 | 동작 |",
          "| --- | --- |",
          "| 방향키 | 하루 또는 한 주 이동 |",
          "| Home, End | 주의 첫 날, 마지막 날로 이동 |",
          "| PageUp, PageDown | 이전 달, 다음 달의 같은 날로 이동 |",
          "| Shift + PageUp, PageDown | 이전 해, 다음 해의 같은 날로 이동 |",
          "| Enter, Space | 포커스한 날짜 선택 |",
          "| Escape | 연월 목록을 닫고 날짜 보기로 돌아감 |",
          "",
          "선택할 수 없는 날짜는 건너뛰고, `minDate`, `maxDate` 밖으로는 경계 날짜에서 멈춥니다. 달이 바뀌는 이동을 하면 표시 중인 달도 함께 바뀝니다.",
        ].join("\n"),
      },
    },
  },
};

export const View: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`view`는 DatePicker의 보기 유형을 결정하는 속성입니다.",
          "- `date`는 기본적으로 사용하는 날짜 보기 유형입니다.",
          "- `month`는 헤더의 월 Label button을 눌렀을 때 보이는 월 목록 보기 유형입니다.",
          "- `year`는 헤더의 연도 Label button을 눌렀을 때 보이는 연도 목록 보기 유형입니다.",
          "",
          "`view`는 prop이 아니라 DatePicker 내부 상태입니다. 이 예시는 월과 연도 버튼을 눌러 각 보기를 연 상태로 보여 줍니다. 목록에서 항목을 고르거나 Escape를 누르면 날짜 보기로 돌아옵니다.",
        ].join("\n"),
      },
      story: { autoplay: true },
    },
  },
  render: () => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start" }}>
      {(["date", "month", "year"] as const).map(view => (
        <FlexColumn key={view} gap='12px' style={{ alignItems: "center" }} data-view={view}>
          <PropertyLabel name='view' value={view} />
          <DatePicker defaultMonth={SAMPLE_MONTH} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
  play: async ({ canvasElement }) => {
    const monthView = canvasElement.querySelector<HTMLElement>("[data-view='month']");
    const yearView = canvasElement.querySelector<HTMLElement>("[data-view='year']");

    if (monthView) await userEvent.click(within(monthView).getByRole("button", { name: "3월" }));
    if (yearView) await userEvent.click(within(yearView).getByRole("button", { name: "2026년" }));
  },
};

export const OutsideMonth: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "표시 중인 달의 앞뒤 주에는 이전, 다음 달 날짜가 주목도를 낮춘 모습으로 함께 보입니다. 이 예시는 3월을 표시하면서 2월 28일이 선택된 상태입니다.",
          "",
          "이전, 다음 달 날짜도 선택할 수 있고, 선택하면 그 날짜의 달로 이동합니다. `readOnly`이면 눌러도 선택과 달 이동 모두 일어나지 않습니다. 셀 자체의 모습은 DatePicker/Cell 스토리에서 확인합니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    defaultValue: SAMPLE_OUTSIDE_DATE,
    defaultMonth: SAMPLE_MONTH,
  },
};

export const WithActionBar: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`withActionBar`는 DatePicker 하부에 별도 액션 영역 포함 여부에 대한 속성입니다.",
          "- 기본적으로는 `withActionBar=false`로 액션 영역 없이 사용합니다.",
          "- 사용자가 오늘 날짜를 빠르게 찾거나, DatePicker를 통해 입력한 날짜를 지울 수 있어야 할 때 `withActionBar=true`로 사용할 수 있습니다.",
          "- 날짜 선택에 별도 확인(적용) 절차가 필요한 경우에도 `withActionBar=true`를 사용할 수 있습니다.",
          "",
          "`withActionBar=true`이면 날짜를 눌러도 바로 확정되지 않고, 적용을 눌러야 `onChange`가 호출됩니다.",
        ].join("\n"),
      },
    },
  },
  render: args => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start" }}>
      {[false, true].map(withActionBar => (
        <FlexColumn key={String(withActionBar)} gap='12px' style={{ alignItems: "center" }}>
          <PropertyLabel name='withActionBar' value={String(withActionBar)} />
          <DatePicker {...args} withActionBar={withActionBar} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const Focused: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "Tab으로 달력에 들어오면 선택된 날짜에 포커스합니다. 선택된 날짜가 표시 중인 달에 없거나 선택할 수 없으면 오늘, 그것도 없으면 그 달의 첫 선택 가능한 날짜에 포커스합니다.",
          "",
          "이 예시는 3월 12일이 선택된 상태에서 Tab으로 달력에 들어온 뒤, 오른쪽 방향키로 13일로 옮긴 모습입니다. 포커스 링은 CSS `:focus-visible`로 표현되므로 키보드로 포커스했을 때만 보입니다.",
        ].join("\n"),
      },
      story: { autoplay: true },
    },
  },
  args: {
    defaultValue: SAMPLE_DATE,
  },
  play: async ({ canvasElement }) => {
    const selectedCell = within(canvasElement).getByRole("gridcell", { name: "2026년 3월 12일" });

    for (let count = 0; count < 10 && document.activeElement !== selectedCell; count += 1) {
      await userEvent.tab();
    }

    await expect(selectedCell).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`value`와 `onChange`로 선택 값을 호출부가 소유하는 예시입니다. 밖에서 `value`를 다른 달의 날짜로 바꾸면 표시 중인 달도 그 달로 이동합니다.",
      },
    },
  },
  render: function ControlledStory() {
    const [date, setDate] = useState<Date | null>(new Date(2026, 2, 12));

    return (
      <FlexColumn gap='16px' style={{ alignItems: "center" }}>
        <DatePicker value={date} onChange={setDate} />
        <FlexRow gap='8px'>
          <span>{date ? date.toLocaleDateString("ko-KR") : "선택 없음"}</span>
          <button type='button' onClick={() => setDate(null)}>
            초기화
          </button>
          <button
            type='button'
            onClick={() =>
              setDate(current => {
                const base = current ?? new Date();

                return new Date(base.getFullYear(), base.getMonth() + 1, base.getDate());
              })
            }
          >
            한 달 뒤로
          </button>
        </FlexRow>
      </FlexColumn>
    );
  },
};

export const ControlledMonth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`month`와 `onMonthChange`로 표시 중인 달을 호출부가 소유하는 예시입니다. 달이 바뀔 때마다 그 달의 1일로 `onMonthChange`가 호출되므로, 달마다 필요한 데이터를 불러올 때 사용할 수 있습니다.",
      },
    },
  },
  render: function ControlledMonthStory() {
    const [month, setMonth] = useState(SAMPLE_MONTH);

    return (
      <FlexColumn gap='16px' style={{ alignItems: "center" }}>
        <DatePicker month={month} onMonthChange={setMonth} />
        <FlexRow gap='8px'>
          <span>{`표시 중: ${month.getFullYear()}년 ${month.getMonth() + 1}월`}</span>
          <button type='button' onClick={() => setMonth(SAMPLE_MONTH)}>
            처음 달로
          </button>
        </FlexRow>
      </FlexColumn>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`disabled`를 켜면 날짜 선택과 달 이동을 모두 할 수 없습니다. `readOnly`를 켜면 달 이동과 연월 목록은 그대로 사용할 수 있지만 선택은 바꿀 수 없고, 액션 바의 지우기와 적용도 비활성화됩니다.",
      },
    },
  },
  args: {
    defaultValue: new Date(2026, 2, 12),
    withActionBar: true,
  },
  render: args => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start" }}>
      <FlexColumn gap='12px' style={{ alignItems: "center" }}>
        <PropertyLabel name='disabled' value='true' />
        <DatePicker {...args} disabled />
      </FlexColumn>
      <FlexColumn gap='12px' style={{ alignItems: "center" }}>
        <PropertyLabel name='readOnly' value='true' />
        <DatePicker {...args} readOnly />
      </FlexColumn>
    </FlexRow>
  ),
};

export const DateRange: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`minDate`, `maxDate`로 선택할 수 있는 날짜 범위를 정합니다. 범위 밖의 날짜는 비활성화되고, 범위의 첫 달과 마지막 달에서는 이전 달, 다음 달 버튼이 비활성화됩니다. 연도 목록은 두 날짜의 연도 사이만 보여 주고, 월 목록에서도 범위 밖의 달은 고를 수 없습니다. `defaultMonth`나 `value`가 범위 밖이면 범위 안의 가장 가까운 달을 표시하고, 오늘이 범위 밖이면 오늘 버튼이 비활성화됩니다.",
      },
    },
  },
  args: {
    minDate: new Date(2026, 2, 10),
    maxDate: new Date(2026, 5, 20),
    withActionBar: true,
  },
};

export const DisabledDates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`isDateDisabled`는 날짜마다 호출되며, `true`를 반환한 날짜는 선택할 수 없습니다. 이 예시는 주말을 비활성화합니다.",
      },
    },
  },
  args: {
    isDateDisabled: date => date.getDay() === 0 || date.getDay() === 6,
  },
};

export const SundayFirst: Story = {
  parameters: {
    docs: {
      description: {
        story: "`weekStartsOn`으로 한 주의 시작 요일을 바꿉니다. DS 기본값은 월요일(1)입니다.",
      },
    },
  },
  args: {
    weekStartsOn: 0,
  },
};

export const WeekCountByMonth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "기본값에서는 주 수가 달마다 4~6주로 정해지고 패널 높이도 그에 맞춰 달라집니다. `fixedWeeks`를 켜면 모든 달을 6주로 표시해 높이가 고정됩니다. 어느 쪽이든 연월 목록을 열어도 패널 크기는 그대로 유지됩니다.",
      },
    },
  },
  render: () => (
    <FlexColumn gap='24px'>
      {[false, true].map(fixedWeeks => (
        <FlexColumn key={String(fixedWeeks)} gap='12px'>
          <PropertyLabel name='fixedWeeks' value={String(fixedWeeks)} />
          <FlexRow gap='16px' style={{ alignItems: "flex-start" }}>
            <DatePicker defaultMonth={new Date(2027, 1, 1)} fixedWeeks={fixedWeeks} />
            <DatePicker defaultMonth={new Date(2026, 8, 1)} fixedWeeks={fixedWeeks} />
            <DatePicker defaultMonth={SAMPLE_MONTH} fixedWeeks={fixedWeeks} />
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};
