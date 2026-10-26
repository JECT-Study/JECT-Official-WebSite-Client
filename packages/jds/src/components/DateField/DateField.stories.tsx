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

import { DateField } from "./DateField";
import type { DateFieldInputState } from "./dateField.types";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

const VALUE_LABEL_STYLE = { width: "auto", whiteSpace: "nowrap" } as const;

const DateFieldFormResult = ({ value }: { value: string | null }) => (
  <div style={{ maxWidth: "100%", overflowX: "auto", whiteSpace: "pre" }}>
    <FormResult value={value} />
  </div>
);

/**
 * 특정 날짜를 직접 입력하거나 달력에서 선택하는 필드입니다.
 * 연, 월, 일을 세그먼트 단위로 편집하며 값은 `"YYYY-MM-DD"` 형식의 문자열입니다.
 *
 * - 숫자를 입력하면 세그먼트가 채워지는 즉시 다음 세그먼트로 넘어갑니다. `2026.7.25`처럼 구분자를 포함해 입력해도 됩니다.
 * - 부분 입력과 존재하지 않는 날짜는 자동 보정하지 않고 유지합니다. 처음에는 오류를 숨기고 필드 전체를 벗어나거나 제출할 때 표시합니다.
 * - 입력창, 달력 버튼, 팝업 사이의 포커스 이동은 필드 이탈로 보지 않습니다. 첫 이탈이나 달력 확정, 검증 실패 이후에는 입력에 맞춰 오류를 갱신하며, 유효해지면 즉시 해제합니다.
 * - 기존 날짜를 다시 입력하는 동안에는 확정된 값을 유지합니다. 연도는 0001–9999를 지원합니다.
 * - 해석할 수 없는 외부 값은 빈 입력과 빈 제출값으로 처리합니다.
 * - 개발 환경에서는 잘못된 외부 `value`와 최초 `defaultValue`를 경고합니다. 같은 Input에서 같은 잘못된 값은 한 번만 경고하며, 사용자 입력과 날짜 제한 오류는 경고하지 않습니다.
 * - 부분 입력과 오류 입력 중에는 마지막 확정값을 유지합니다. 화면의 편집 내용과 확정값은 다를 수 있습니다.
 * - 확정값을 빈 문자열로 바꾸면 입력도 비워집니다. 이미 빈 문자열인 상태의 부분 입력은 같은 값을 다시 설정해도 유지됩니다.
 * - 부분 입력까지 초기화하려면 폼을 초기화합니다. 폼 없이 입력을 모두 비우려면 `value`를 빈 문자열로 설정하고 `DateField.Input`의 `key`를 바꿔 다시 마운트합니다.
 * - 폼 초기화는 비제어 모드에서 최초 `defaultValue`로 돌아갑니다. 제어 모드에서는 확정값이 비어 있지 않으면 `onChange("")`로 변경을 요청하며 소비처가 반영해야 합니다.
 * - 달력에서 고른 날짜는 입력값에 반영하고, 입력한 날짜는 달력에서 선택된 상태로 보여 줍니다.
 * - `onChange`는 확정값이 바뀔 때 호출됩니다. `minLength`, `maxLength`와 네이티브 `onInput`, `onBeforeInput`, `onChangeCapture` 및 입력 이벤트의 capture props는 받지 않습니다.
 * - `onInputStateChange`로 편집 내용, 현재 유효한 제출값, 오류 종류와 오류 표시 여부를 확인합니다. 빈 선택 입력과 부분 입력도 구분할 수 있습니다.
 * - 키보드나 붙여넣기 동작을 취소하려면 `onKeyDown`, `onPaste`에서 `preventDefault()`를 사용합니다.
 * - blur에서는 소비처 `onBlur` 실행 후 부분 입력을 확정하고, 확정값이 바뀌면 `onChange`를 호출합니다. `onBlur`에서 읽은 확정값은 이전 값일 수 있습니다.
 *
 * | 키 | 동작 |
 * | --- | --- |
 * | `←` `→` | 세그먼트 이동 |
 * | `↑` `↓` | 값 증감. 월과 일은 끝에서 반대쪽 끝으로 순환 |
 * | `Home` `End` | 월과 일을 첫 값, 마지막 값으로 변경 |
 * | `Backspace` `Delete` | 세그먼트 비우기. 빈 세그먼트에서 `Backspace`는 앞 세그먼트로 이동 |
 * | `Ctrl/⌘ + A` | 전체 선택. 이어서 `Backspace`로 모두 지우거나 숫자를 입력해 처음부터 다시 입력 |
 * | `Ctrl/⌘ + V` | `2026.07.25`, `2026-7-25`, `2026년 7월 25일`, `20260725` 형식 붙여넣기 |
 * | `Alt + ↓` | 달력 열기. 달력 버튼에서는 `Enter`, `Space` |
 * | `Esc` | 달력 닫기. 입력에서 열었다면 기존 세그먼트로, 버튼에서 열었다면 버튼으로 돌아감 |
 * | `Enter` | 입력 중 세그먼트를 확정하고 폼의 기본 제출 동작 실행 |
 * | `Tab` | 입력에서 달력 버튼으로, 다시 필드 밖으로 이동 |
 *
 * 달력 안의 키보드 조작은 `DatePicker`와 같습니다. 날짜 선택 완료 후에는 입력창으로 포커스가 돌아갑니다.
 * 달력 밖의 입력을 클릭하면 달력을 닫고 클릭한 입력으로 포커스를 이동합니다.
 * 필수 빈 입력은 최초에 오류를 숨기고, 필드를 벗어나거나 달력 지우기를 확정하거나 제출하면 표시합니다. 폼 초기화 시 오류 표시 이력도 지웁니다.
 */
const meta = {
  title: "Components/DateField",
  component: DateField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <DateField {...args} style={FIELD_WIDTH}>
      <DateField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </DateField.Label>
      <DateField.Input />
      <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
    </DateField>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <DateField status={status} style={FIELD_WIDTH}>
            <DateField.Label>레이블</DateField.Label>
            <DateField.Input defaultValue='2026-07-25' />
            <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
          </DateField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 값을 바꿀 수 없습니다.
 * `disabled`는 포커스를 받을 수 없으며, `readonly`는 포커스와 세그먼트 이동이 가능합니다.
 * 입력이 비활성 또는 읽기 전용 상태가 되거나 `withPicker={false}`로 바뀌면 열린 달력을 닫습니다.
 * 부모 `fieldset`을 비활성화하면 이미 열린 달력에서도 날짜 선택과 지우기를 확정할 수 없습니다.
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
          {["", "2026-07-25"].map(defaultValue => (
            <DateField key={defaultValue} {...props} style={FIELD_WIDTH}>
              <DateField.Label>레이블</DateField.Label>
              <DateField.Input defaultValue={defaultValue} />
              <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
            </DateField>
          ))}
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `suffix`로 달력 버튼 오른쪽에 `Kbd`를 배치합니다.
 * 실제 달력 열기 단축키인 Alt + ↓를 표시합니다. suffix는 단축키를 등록하지 않습니다.
 */
export const WithKbd: Story = {
  render: () => (
    <DateField style={FIELD_WIDTH}>
      <DateField.Label>레이블</DateField.Label>
      <DateField.Input
        suffix={
          <Kbd size='sm' type='text'>
            Alt + ↓
          </Kbd>
        }
      />
      <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
    </DateField>
  ),
};

/**
 * `withPicker={false}`로 달력 버튼 없이 직접 입력만 받습니다.
 * 생년월일처럼 이미 알고 있는 날짜를 입력받을 때 사용합니다.
 */
export const WithoutPicker: Story = {
  render: () => (
    <DateField style={FIELD_WIDTH}>
      <DateField.Label>생년월일</DateField.Label>
      <DateField.Input withPicker={false} />
    </DateField>
  ),
};

const ActionBarPreview = () => {
  const [date, setDate] = useState("2026-07-25");

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <DateField style={FIELD_WIDTH}>
        <DateField.Label>시작일</DateField.Label>
        <DateField.Input value={date} onChange={setDate} withActionBar />
        <DateField.Helper>달력에서 선택한 뒤 적용을 눌러주세요</DateField.Helper>
      </DateField>
      <Label style={VALUE_LABEL_STYLE}>value: {date === "" ? "빈 문자열" : date}</Label>
    </FlexColumn>
  );
};

/**
 * `withActionBar`로 달력 아래에 오늘, 지우기, 적용 버튼을 표시합니다.
 * 날짜를 선택하거나 지워도 입력값은 유지되며, 적용을 눌러야 값이 바뀌고 달력이 닫힙니다.
 * 적용하지 않고 달력을 닫으면 임시 선택은 버립니다. 오늘 버튼은 오늘이 있는 달로 이동하고 오늘을 임시 선택합니다.
 * 직접 입력한 날짜는 적용 버튼과 관계없이 기존 입력 방식대로 확정됩니다.
 * 임시 선택 뒤 날짜 제한이 바뀌면 적용 시점에 다시 검사하고, 제한 밖 날짜는 확정하지 않습니다.
 * 부분 입력과 잘못된 날짜도 지우기 후 적용하면 비워집니다. 적용 전에 닫으면 기존 입력을 유지합니다.
 */
export const WithActionBar: Story = {
  render: () => <ActionBarPreview />,
};

const SelectableDatesPreview = () => {
  const [date, setDate] = useState("2026-07-24");
  const [inputState, setInputState] = useState<DateFieldInputState | null>(null);

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <DateField style={FIELD_WIDTH}>
        <DateField.Label>방문일</DateField.Label>
        <DateField.Input
          value={date}
          onChange={setDate}
          onInputStateChange={setInputState}
          minDate={new Date(2026, 0, 1)}
          maxDate={new Date(2026, 11, 31)}
          isDateDisabled={day => day.getDay() === 0 || day.getDay() === 6}
        />
        <DateField.Helper>2026년의 평일만 선택할 수 있어요</DateField.Helper>
      </DateField>
      <InputStatePreview label='방문일 입력 상태' state={inputState} />
    </FlexColumn>
  );
};

/**
 * `minDate`, `maxDate`, `isDateDisabled`는 달력과 직접 입력에 동일하게 적용됩니다.
 * 텍스트 입력에 적용되지 않는 네이티브 `min`, `max` prop은 받지 않습니다.
 * 제한 밖 입력은 화면에 유지하고 내장 오류 메시지로 안내합니다. 마지막 확정값은 변경하지 않습니다.
 */
export const SelectableDates: Story = {
  render: () => <SelectableDatesPreview />,
};

/**
 * 주변 맥락이 레이블을 대신한다면 레이블 없이 `aria-label`로 이름을 제공합니다.
 */
export const WithoutLabel: Story = {
  render: () => (
    <DateField style={FIELD_WIDTH}>
      <DateField.Input aria-label='시작일' />
    </DateField>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const entry = new FormData(event.currentTarget).get("startDate");
        setSubmitted(typeof entry === "string" ? entry : null);
      }}
      onReset={() => setSubmitted(null)}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <DateField style={FIELD_WIDTH}>
          <DateField.Label>시작일</DateField.Label>
          <DateField.Input name='startDate' defaultValue='2026-07-25' />
        </DateField>
        <FlexRow gap='8px' style={FIELD_WIDTH}>
          <BlockButton type='reset' style={{ flex: 1 }}>
            초기화
          </BlockButton>
          <BlockButton type='submit' style={{ flex: 1 }}>
            제출
          </BlockButton>
        </FlexRow>
        <DateFieldFormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * 화면에는 `YYYY.MM.DD`로 표시하고, `name`을 지정하면 폼에는 `"YYYY-MM-DD"` 값으로 제출됩니다.
 * 초기화를 누르면 최초 `defaultValue`로 돌아가고 제출 결과를 지웁니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};

/** 달력에서도 DateField가 표현할 수 있는 0001–9999년 날짜만 선택할 수 있습니다. */
export const BoundaryDates: Story = {
  render: () => (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      {["0001-01-01", "9999-12-31"].map(value => (
        <DateField key={value} style={FIELD_WIDTH}>
          <DateField.Label>{value}</DateField.Label>
          <DateField.Input defaultValue={value} />
        </DateField>
      ))}
    </FlexColumn>
  ),
};

interface InputStatePreviewProps {
  label: string;
  state: DateFieldInputState | null;
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
  const [optionalState, setOptionalState] = useState<DateFieldInputState | null>(null);
  const [requiredState, setRequiredState] = useState<DateFieldInputState | null>(null);
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
          부분 입력, 2026.02.31 붙여넣기, 전체 삭제를 확인해 보세요. 오류가 있으면 제출할 수 없어요.
        </p>
        <DateField style={FIELD_WIDTH}>
          <DateField.Label>선택 입력 날짜</DateField.Label>
          <DateField.Input
            name='optionalDate'
            withActionBar
            onInputStateChange={setOptionalState}
          />
          <DateField.Helper>날짜가 필요하지 않으면 비워 두세요</DateField.Helper>
        </DateField>
        <InputStatePreview label='선택 입력 상태' state={optionalState} />
        <DateField required style={FIELD_WIDTH}>
          <DateField.Label>필수 입력 날짜</DateField.Label>
          <DateField.Input
            name='requiredDate'
            withActionBar
            onInputStateChange={setRequiredState}
          />
        </DateField>
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
        <DateFieldFormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * 빈 선택 입력은 유효하고, 부분 입력과 존재하지 않는 날짜는 입력 중부터 error로 알립니다.
 * 오류 표시는 최초 필드 이탈, 달력의 날짜 선택 또는 지우기 확정, 네이티브 검증 실패 시 시작합니다.
 * 입력창에서 달력 버튼, 팝업으로 이동하거나 Esc로 돌아오는 동안에는 최초 오류를 표시하지 않습니다.
 * 한 번 검증한 뒤에는 입력 중에도 오류를 갱신하며, 유효한 날짜가 되면 즉시 해제합니다.
 * 제출 또는 `checkValidity()`, `reportValidity()` 검증에 실패하면 이탈 여부와 무관하게 오류를 표시합니다.
 * `onInputStateChange`의 `value`는 현재 입력이 유효할 때만 날짜를 갖습니다. 오류 입력에서는 빈 문자열입니다.
 * 오류가 있으면 일반 헬퍼 대신 내장 메시지를 표시하며, 헬퍼가 없는 구성에도 오류 메시지가 나타납니다.
 * 초기화하면 입력과 오류 표시가 최초 상태로 돌아갑니다. 달력을 연 뒤 다음 입력을 클릭해 포커스 이동도 확인할 수 있습니다.
 */
export const Validation: Story = {
  render: () => <ValidationPreview />,
};

const ControlledRejectionPreview = () => {
  const [date, setDate] = useState("2026-07-25");
  const [requested, setRequested] = useState<string | null>(null);
  const [inputState, setInputState] = useState<DateFieldInputState | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [isClearedOnReset, setIsClearedOnReset] = useState(false);
  const [isResetCancelled, setIsResetCancelled] = useState(false);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const entry = new FormData(event.currentTarget).get("controlledDate");
        setSubmitted(typeof entry === "string" ? entry : null);
      }}
      onReset={event => {
        if (isResetCancelled) event.preventDefault();
        else if (isClearedOnReset) setDate("");
      }}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start", maxWidth: "480px" }}>
        <p style={{ margin: 0 }}>
          날짜 변경 요청을 반영하지 않는 예시예요. 직접 입력, 달력 선택, 초기화로 변경을 요청해도
          외부에서 지정한 값이 유지돼요.
        </p>
        <DateField required style={FIELD_WIDTH}>
          <DateField.Label>제어된 날짜</DateField.Label>
          <DateField.Input
            name='controlledDate'
            value={date}
            onChange={setRequested}
            onInputStateChange={setInputState}
          />
          <DateField.Helper>부분 입력과 오류 입력은 수정할 수 있어요</DateField.Helper>
        </DateField>
        <Label style={VALUE_LABEL_STYLE}>외부 값: {date || "빈 문자열"}</Label>
        <Label style={VALUE_LABEL_STYLE}>
          마지막 변경 요청: {requested === null ? "없음" : requested || "빈 문자열"}
        </Label>
        <InputStatePreview label='제어 입력 상태' state={inputState} />
        <label>
          <input
            type='checkbox'
            checked={isClearedOnReset}
            onChange={event => setIsClearedOnReset(event.target.checked)}
          />
          초기화 시 부모 값도 비우기
        </label>
        <label>
          <input
            type='checkbox'
            checked={isResetCancelled}
            onChange={event => setIsResetCancelled(event.target.checked)}
          />
          초기화 취소
        </label>
        <FlexRow gap='8px' style={{ flexWrap: "wrap" }}>
          <BlockButton type='button' onClick={() => setDate("2026-08-20")}>
            외부 값 교체
          </BlockButton>
          <BlockButton type='button' onClick={() => setDate("")}>
            외부 값 비우기
          </BlockButton>
          <BlockButton type='reset'>초기화 요청</BlockButton>
          <BlockButton type='submit'>제출</BlockButton>
        </FlexRow>
        <DateFieldFormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * `onChange`를 받더라도 소비처가 `value`를 바꾸지 않으면 완성된 날짜 변경 요청은 거절됩니다.
 * 직접 입력과 달력 선택 모두 외부 값을 따르고, 폼 초기화의 빈 값 변경 요청을 거절해도 외부 값을 유지합니다.
 * 부분·오류 입력은 마지막 확정값과 별도로 유지하지만, 외부 값 교체와 비우기는 편집 중 내용도 대체합니다.
 * 외부 값이 이미 빈 문자열이면 같은 빈 문자열을 다시 설정해도 부분 입력을 비우지 않습니다. 이때 폼 초기화를 사용합니다.
 */
export const ControlledRejection: Story = {
  render: () => <ControlledRejectionPreview />,
};
