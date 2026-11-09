import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FIELD_PLAYGROUND_ARGS,
  FIELD_WIDTH,
  fieldArgTypes,
  FormResult,
} from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { TimeField } from "./TimeField";
import type { TimeFieldInputState } from "./timeField.types";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

const VALUE_LABEL_STYLE = { width: "auto", whiteSpace: "nowrap" } as const;

const TimeFieldFormResult = ({ value }: { value: string | null }) => (
  <div style={{ maxWidth: "100%", overflowX: "auto", whiteSpace: "pre" }}>
    <FormResult value={value} />
  </div>
);

/**
 * 하루 안의 특정 시각을 직접 입력하거나 시간 선택에서 고르는 필드입니다.
 * 오전/오후, 시, 분을 세그먼트 단위로 편집하며 값은 `"HH:mm"` 형식의 24시간제 문자열입니다.
 *
 * - 화면에는 `오전 09:30`으로 표시합니다. 포커스 전 빈 값은 `오전 --:--`, 포커스하면 고르지 않은 오전/오후를 `--`로 보여 줍니다.
 * - 숫자를 입력하면 세그먼트가 채워지는 즉시 다음 세그먼트로 넘어갑니다. `9:30`처럼 구분자를 포함해 입력해도 됩니다.
 * - 오전/오후가 `--`일 때 시를 입력하면 24시간제로 해석해 오전/오후도 함께 정합니다. `0930`은 오전 09:30, `2130`은 오후 09:30, `1200`은 오후 12:00입니다.
 * - 오전/오후가 이미 정해져 있으면 1–12시는 그대로 두고, 0시와 13–23시만 24시간제로 바꿉니다. `오전`에서 `12`를 입력하면 오전 12시(자정)입니다.
 * - 오전/오후 세그먼트에서는 `a`, `p` 또는 `오전`, `오후`를 입력하거나 `↑` `↓`로 고릅니다. 숫자를 입력하면 시부터 채웁니다.
 * - 부분 입력과 없는 시각은 자동 보정하지 않고 유지합니다. 처음에는 오류를 숨기고 필드 전체를 벗어나거나 제출할 때 표시합니다.
 * - 분이 `minuteStep` 간격에 맞지 않으면 오류입니다. 기본 간격은 5분입니다.
 * - 입력창, 시간 선택 버튼, 팝업 사이의 포커스 이동은 필드 이탈로 보지 않습니다.
 * - 기존 시각을 다시 입력하는 동안에는 확정된 값을 유지합니다. 해석할 수 없는 외부 값은 빈 입력과 빈 제출값으로 처리합니다.
 * - `onChange`는 확정값이 바뀔 때 호출됩니다. `onInputStateChange`로 편집 내용, 현재 유효한 제출값, 오류 종류와 오류 표시 여부를 확인합니다.
 *
 * | 키 | 동작 |
 * | --- | --- |
 * | `←` `→` | 세그먼트 이동 |
 * | `↑` `↓` | 값 증감. 오전/오후는 `--`에서 `↑`면 오전, `↓`면 오후로 정한 뒤 전환, 시는 12–11 순환, 분은 `minuteStep` 간격으로 순환 |
 * | `Home` `End` | 첫 값, 마지막 값으로 변경 |
 * | `Backspace` `Delete` | 세그먼트 비우기. 빈 세그먼트에서 `Backspace`는 앞 세그먼트로 이동 |
 * | `Ctrl/⌘ + A` | 전체 선택. 이어서 `Backspace`로 모두 지우거나 숫자를 입력해 처음부터 다시 입력 |
 * | `Ctrl/⌘ + V` | `오후 9:30`, `오후 9시 30분`, `21:30`, `2130` 형식 붙여넣기 |
 * | `Alt + ↓` | 시간 선택 열기. 시간 선택 버튼에서는 `Enter`, `Space` |
 * | `Esc` | 시간 선택 닫기. 입력에서 열었다면 기존 세그먼트로, 버튼에서 열었다면 버튼으로 돌아감 |
 * | `Enter` | 입력 중 세그먼트를 확정하고 폼의 기본 제출 동작 실행 |
 * | `Tab` | 입력에서 시간 선택 버튼으로, 다시 필드 밖으로 이동 |
 *
 * 시간 선택 안의 키보드 조작은 `TimePicker`와 같습니다. 열면 오전/오후 열에 포커스합니다.
 * 적용 버튼이 없으면 열에서 고를 때마다 입력값에 반영하고 시간 선택은 열어 둡니다.
 */
const meta = {
  title: "Components/TimeField",
  component: TimeField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: {
    ...fieldArgTypes,
    status: {
      control: "inline-radio",
      options: ["default", "error"],
      description: "유효성/피드백 상태",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <TimeField {...args} style={FIELD_WIDTH}>
      <TimeField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </TimeField.Label>
      <TimeField.Input />
      <TimeField.Helper>헬퍼 메시지 텍스트</TimeField.Helper>
    </TimeField>
  ),
};

/**
 * Time field는 기본과 오류 상태만 사용합니다. 오류에는 해결 방법을 헬퍼 메시지로 안내합니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <TimeField status={status} style={FIELD_WIDTH}>
            <TimeField.Label>시작 시각</TimeField.Label>
            <TimeField.Input defaultValue='09:30' />
            <TimeField.Helper>
              {status === "error"
                ? "종료 시각보다 이른 시각을 입력해 주세요."
                : "헬퍼 메시지 텍스트"}
            </TimeField.Helper>
          </TimeField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 값을 바꿀 수 없습니다.
 * `disabled`는 포커스를 받을 수 없으며, `readonly`는 포커스와 세그먼트 이동이 가능합니다.
 * 입력이 비활성 또는 읽기 전용 상태가 되거나 `withPicker={false}`로 바뀌면 열린 시간 선택을 닫습니다.
 */
export const States: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["disabled", { disabled: true }],
          ["readonly", { readonly: true }],
          ["required", { required: true }],
        ] as const
      ).map(([name, props]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          {["", "21:30"].map(defaultValue => (
            <TimeField key={defaultValue} {...props} style={FIELD_WIDTH}>
              <TimeField.Label>레이블</TimeField.Label>
              <TimeField.Input defaultValue={defaultValue} />
              <TimeField.Helper>헬퍼 메시지 텍스트</TimeField.Helper>
            </TimeField>
          ))}
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `suffix`로 시간 선택 버튼 오른쪽에 `Kbd`를 배치합니다.
 * 실제 시간 선택 열기 단축키인 Alt + ↓를 표시합니다. suffix는 단축키를 등록하지 않습니다.
 */
export const WithKbd: Story = {
  render: () => (
    <TimeField style={FIELD_WIDTH}>
      <TimeField.Label>레이블</TimeField.Label>
      <TimeField.Input
        suffix={
          <Kbd size='sm' type='text'>
            Alt + ↓
          </Kbd>
        }
      />
      <TimeField.Helper>헬퍼 메시지 텍스트</TimeField.Helper>
    </TimeField>
  ),
};

/**
 * `withPicker={false}`로 시간 선택 버튼 없이 직접 입력만 받습니다.
 */
export const WithoutPicker: Story = {
  render: () => (
    <TimeField style={FIELD_WIDTH}>
      <TimeField.Label>도착 시각</TimeField.Label>
      <TimeField.Input withPicker={false} />
    </TimeField>
  ),
};

const ActionBarPreview = () => {
  const [time, setTime] = useState("09:30");

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <TimeField style={FIELD_WIDTH}>
        <TimeField.Label>시작 시각</TimeField.Label>
        <TimeField.Input value={time} onChange={setTime} withActionBar />
        <TimeField.Helper>시간을 고른 뒤 적용을 눌러주세요</TimeField.Helper>
      </TimeField>
      <Label style={VALUE_LABEL_STYLE}>value: {time === "" ? "빈 문자열" : time}</Label>
    </FlexColumn>
  );
};

/**
 * `withActionBar`로 시간 선택 아래에 적용 버튼을 표시합니다.
 * 열에서 골라도 입력값은 유지되며, 적용을 눌러야 값이 바뀌고 시간 선택이 닫힙니다.
 * 적용하지 않고 닫으면 임시 선택은 버립니다. 직접 입력한 시각은 적용 버튼과 관계없이 확정됩니다.
 */
export const WithActionBar: Story = {
  render: () => <ActionBarPreview />,
};

const TimeRangePreview = () => {
  const [time, setTime] = useState("10:00");
  const [inputState, setInputState] = useState<TimeFieldInputState | null>(null);

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <TimeField style={FIELD_WIDTH}>
        <TimeField.Label>예약 시각</TimeField.Label>
        <TimeField.Input
          value={time}
          onChange={setTime}
          onInputStateChange={setInputState}
          minuteStep={30}
          minTime={{ hour: 9, minute: 0, second: 0 }}
          maxTime={{ hour: 18, minute: 0, second: 0 }}
        />
        <TimeField.Helper>오전 9시부터 오후 6시까지 30분 단위로 예약할 수 있어요</TimeField.Helper>
      </TimeField>
      <InputStatePreview label='예약 시각 입력 상태' state={inputState} />
    </FlexColumn>
  );
};

/**
 * `minTime`, `maxTime`, `minuteStep`은 시간 선택과 직접 입력에 동일하게 적용됩니다.
 * 범위 밖이거나 간격에 맞지 않는 입력은 화면에 유지하고 내장 오류 메시지로 안내합니다. 마지막 확정값은 변경하지 않습니다.
 * 텍스트 입력에 적용되지 않는 네이티브 `min`, `max`, `step` prop은 받지 않습니다.
 */
export const TimeRange: Story = {
  render: () => <TimeRangePreview />,
};

/**
 * 주변 맥락이 레이블을 대신한다면 레이블 없이 `aria-label`로 이름을 제공합니다.
 */
export const WithoutLabel: Story = {
  render: () => (
    <TimeField style={FIELD_WIDTH}>
      <TimeField.Input aria-label='시작 시각' />
    </TimeField>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const entry = new FormData(event.currentTarget).get("startTime");
        setSubmitted(typeof entry === "string" ? entry : null);
      }}
      onReset={() => setSubmitted(null)}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <TimeField style={FIELD_WIDTH}>
          <TimeField.Label>시작 시각</TimeField.Label>
          <TimeField.Input name='startTime' defaultValue='21:30' />
        </TimeField>
        <FlexRow gap='8px' style={FIELD_WIDTH}>
          <BlockButton type='reset' style={{ flex: 1 }}>
            초기화
          </BlockButton>
          <BlockButton type='submit' style={{ flex: 1 }}>
            제출
          </BlockButton>
        </FlexRow>
        <TimeFieldFormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * 화면에는 `오후 09:30`으로 표시하고, `name`을 지정하면 폼에는 `"21:30"` 값으로 제출됩니다.
 * 초기화를 누르면 최초 `defaultValue`로 돌아가고 제출 결과를 지웁니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};

interface InputStatePreviewProps {
  label: string;
  state: TimeFieldInputState | null;
}

const InputStatePreview = ({ label, state }: InputStatePreviewProps) => (
  <output
    aria-label={label}
    style={{
      display: "block",
      maxWidth: "100%",
      overflowX: "auto",
      whiteSpace: "pre",
      fontSize: "14px",
    }}
  >
    {label}
    {"\n"}
    {JSON.stringify(state, null, 2)}
  </output>
);

const ValidationPreview = () => {
  const [optionalState, setOptionalState] = useState<TimeFieldInputState | null>(null);
  const [requiredState, setRequiredState] = useState<TimeFieldInputState | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(JSON.stringify(Object.fromEntries(data), null, 2));
      }}
      onReset={() => setSubmitted(null)}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start", maxWidth: "480px" }}>
        <p style={{ margin: 0 }}>
          부분 입력, 09:07 입력, 오전 13:00 붙여넣기, 전체 삭제를 확인해 보세요. 오류가 있으면
          제출할 수 없어요.
        </p>
        <TimeField style={FIELD_WIDTH}>
          <TimeField.Label>선택 입력 시각</TimeField.Label>
          <TimeField.Input name='optionalTime' onInputStateChange={setOptionalState} />
          <TimeField.Helper>시각이 필요하지 않으면 비워 두세요</TimeField.Helper>
        </TimeField>
        <InputStatePreview label='선택 입력 상태' state={optionalState} />
        <TimeField required style={FIELD_WIDTH}>
          <TimeField.Label>필수 입력 시각</TimeField.Label>
          <TimeField.Input name='requiredTime' onInputStateChange={setRequiredState} />
        </TimeField>
        <InputStatePreview label='필수 입력 상태' state={requiredState} />
        <label>
          다음 입력
          <input aria-label='다음 입력' style={{ display: "block" }} />
        </label>
        <FlexRow gap='8px' style={FIELD_WIDTH}>
          <BlockButton type='reset' style={{ flex: 1 }}>
            초기화
          </BlockButton>
          <BlockButton type='submit' style={{ flex: 1 }}>
            제출
          </BlockButton>
        </FlexRow>
        <TimeFieldFormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * 빈 선택 입력은 유효하고, 부분 입력과 없는 시각, 간격에 맞지 않는 분은 입력 중부터 error로 알립니다.
 * 오류 표시는 최초 필드 이탈, 시간 선택에서 고르기, 네이티브 검증 실패 시 시작합니다.
 * 한 번 검증한 뒤에는 입력 중에도 오류를 갱신하며, 유효한 시각이 되면 즉시 해제합니다.
 * 오류가 있으면 일반 헬퍼 대신 내장 메시지를 표시하며, 헬퍼가 없는 구성에도 오류 메시지가 나타납니다.
 */
export const Validation: Story = {
  render: () => <ValidationPreview />,
};

const ControlledPreview = () => {
  const [time, setTime] = useState("09:30");

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <TimeField style={FIELD_WIDTH}>
        <TimeField.Label>시작 시각</TimeField.Label>
        <TimeField.Input value={time} onChange={setTime} />
      </TimeField>
      <Label style={VALUE_LABEL_STYLE}>value: {time === "" ? "빈 문자열" : time}</Label>
      <FlexRow gap='8px'>
        <BlockButton type='button' onClick={() => setTime("14:00")}>
          오후 2시로 바꾸기
        </BlockButton>
        <BlockButton type='button' onClick={() => setTime("")}>
          비우기
        </BlockButton>
      </FlexRow>
    </FlexColumn>
  );
};

/**
 * `value`와 `onChange`로 확정값을 호출부가 소유합니다. 외부에서 값을 바꾸면 편집 중 내용도 대체합니다.
 */
export const Controlled: Story = {
  render: () => <ControlledPreview />,
};
