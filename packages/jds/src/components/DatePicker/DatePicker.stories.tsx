import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState, type ReactNode } from "react";
import { fn, userEvent, within } from "storybook/test";

import { DatePicker } from "./DatePicker";
import { Cell, CELL_STATUS_OPTIONS, type CellStatus } from "./parts/Cell";
import { WEEKDAY_OPTIONS } from "./parts/WeekdayLabel";

import { Code } from "@/components/Code";

const SAMPLE_MONTH = new Date(2026, 2, 1);
const SAMPLE_DATE = new Date(2026, 2, 30);
const SAMPLE_OUTSIDE_DATE = new Date(2026, 1, 28);

const PropertyLabel = ({ name, value }: { name: string; value: string }) => (
  <FlexRow gap='6px' style={{ alignItems: "center" }}>
    <span>{name}</span>
    <Code>{value}</Code>
  </FlexRow>
);

const StatusMatrix = ({
  columns,
  renderCell,
}: {
  columns: string[];
  renderCell: (status: CellStatus, column: string) => ReactNode;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `auto repeat(${columns.length}, minmax(64px, auto))`,
      alignItems: "center",
      justifyItems: "center",
      gap: "16px",
    }}
  >
    <span />
    {columns.map(column => (
      <Code key={column}>{column}</Code>
    ))}
    {CELL_STATUS_OPTIONS.map(status => [
      <Code key={status}>{status}</Code>,
      ...columns.map(column => <div key={`${status}-${column}`}>{renderCell(status, column)}</div>),
    ])}
  </div>
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
          "선택 값은 `value`를 넘기면 호출부가 소유하고, 넘기지 않으면 `defaultValue`로 시작해 DatePicker가 기억합니다. 표시 중인 달은 DatePicker가 관리하며, 달은 이전 달, 다음 달 버튼과 연월 목록으로만 이동합니다. 팝오버 연결과 `role='grid'` 같은 접근성 구조는 아직 없습니다.",
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

export const State: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`state`는 UI 요소의 상호작용 상태를 시각적으로 정의한 속성입니다.",
          "- `rest`는 상호작용하기 이전의 기본값입니다.",
          "- `hover`는 해당 요소 위에 포인팅 장치를 올려둔 상태입니다.",
          "- `active`는 해당 요소에 대해 클릭이나 탭(터치) 등의 조치를 취한 상태입니다. '눌린 상태'로도 해석할 수 있습니다.",
          "",
          "`state`는 prop이 아니라 CSS `:hover`, `:active`로 표현됩니다. 아래 표는 rest 모습이며, hover와 active는 셀에 포인터를 올리거나 눌러 확인합니다. rest에서 hover로는 `motion.fluent`, `duration.100`으로 전환되고, hover에서 active로는 모션 없이 즉시 바뀝니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <StatusMatrix
      columns={["rest"]}
      renderCell={status => <Cell date={SAMPLE_DATE} status={status} />}
    />
  ),
};

export const Status: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`status`는 DatePicker 캘린더 셀의 선택 상태에 대한 속성입니다.",
          "- `normal`은 일반적인 날짜 셀입니다.",
          "- `current`는 시스템 날짜 상의 오늘에 해당하는 셀입니다.",
          "- `selected`는 사용자 혹은 시스템에 의해 선택된 날짜 셀입니다.",
          "",
          "DatePicker가 날짜마다 `status`를 정하며, 값이 바뀔 때 `motion.fluent`, `duration.150`으로 전환됩니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <FlexRow gap='48px'>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='12px' style={{ alignItems: "center" }}>
          <PropertyLabel name='status' value={status} />
          <Cell date={SAMPLE_DATE} status={status} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
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
          "`outsideMonth`는 현재 보고 있는 달의 이전, 다음 달에 해당하는 날짜 셀 여부에 대한 속성입니다.",
          "- `outsideMonth=false`는 현재 보고 있는 달에 해당하는 날짜인 경우입니다.",
          "- 이전, 다음 달에 해당하는 날짜라면 `outsideMonth=true`로 주목도를 낮춰 구분합니다.",
          "",
          "`outsideMonth=true`인 셀은 표시만 하고 선택할 수 없습니다. 선택된 날짜가 이전이나 다음 달에 걸쳐 보이는 경우에만 `selected` 모습으로 나타납니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <FlexRow gap='64px'>
      {[false, true].map(outsideMonth => (
        <FlexColumn key={String(outsideMonth)} gap='12px' style={{ alignItems: "center" }}>
          <PropertyLabel name='outsideMonth' value={String(outsideMonth)} />
          <FlexRow gap='16px'>
            {CELL_STATUS_OPTIONS.map(status => (
              <Cell
                key={status}
                date={outsideMonth ? SAMPLE_OUTSIDE_DATE : SAMPLE_MONTH}
                status={status}
                outsideMonth={outsideMonth}
              />
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
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

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`disabled`는 비활성화 여부에 대한 속성입니다.",
          "`disabled=true`라면 DatePicker Cell이 비활성화되었으므로 시각적으로 미묘하게 처리해 접근할 수 없음을 암시합니다.",
          "또한 `state=rest`가 아닌 다른 상호작용 상태와 `disabled=true`는 함께 조합될 수 없습니다.",
          "",
          "DatePicker에서는 `minDate`, `maxDate` 범위 밖의 날짜와 `isDateDisabled`가 `true`를 반환한 날짜가 `disabled`로 표시됩니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <StatusMatrix
      columns={["false", "true"]}
      renderCell={(status, column) => (
        <Cell date={SAMPLE_DATE} status={status} disabled={column === "true"} />
      )}
    />
  ),
};

export const Focused: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`focused`는 키보드 조작이나 음성 명령 등으로 포커스한 상태입니다.",
          "`disabled=true`와 `focused=true`는 Figma에서 샌드박스적으로 함께 조합할 수 있지만, 실제 개발에서는 사용하지 않습니다.",
          "다만 스크린리더 사용자에게 '비활성화된 상태와 이유'를 명확히 전달해야 하는 상황이라면 사용에 대해 별도 논의합니다.",
          "",
          "`focused`는 prop이 아니라 CSS `:focus-visible`로 표현됩니다. 아래 표는 `focused=false` 모습이며, `focused=true`는 셀에 Tab으로 포커스해 포커스 링을 확인합니다. 비활성화된 셀은 native `disabled`라 포커스를 받지 않습니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <StatusMatrix
      columns={["false"]}
      renderCell={status => <Cell date={SAMPLE_DATE} status={status} />}
    />
  ),
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
